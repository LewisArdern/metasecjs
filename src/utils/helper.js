/* eslint-disable max-depth */
const fs = require('fs')
const db = JSON.parse(fs.readFileSync(`${getDirname()}/database.json`))
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')

function getDirname() {
  return __dirname
}

function createSuggestions(packages) {
  let object = {}
  packages.forEach(file => {
    const result = readFile(file)
    const dependencies = parseDependencies(result)
    object[file] = matchDeps(dependencies)
    object[file].usesElectron = Object.keys(dependencies).includes('electron')
  })
  return object
}

function retrieveDependencies(packages) {
  let object = {}
  packages.forEach(file => {
    const result = readFile(file)
    object[file] = parseDependencies(result)
  })
  return object
}

function readFile(element) {
  return fs.readFileSync(element)
}

function parseDependencies(result) {
  const parsed = JSON.parse(result)
  if (parsed.dependencies === undefined) {
    parsed.dependencies = ''
  }
  return parsed.dependencies
}

function matchDeps(dependencies) {
  let deps = {}
  let keys = Object.keys(db.dependencies)
  for (let [dep, version] of Object.entries(dependencies)) {
    if (keys.includes(dep)) {
      deps[dep] = db.dependencies[dep]
      deps[dep].version = version
    }
  }
  return deps
}

function writeSuggestions(suggestions, outDir) {
  let records = []
  // TODO: refactor required but YOLO for PoC.
  for (let [_key, value] of Object.entries(suggestions)) {
    for (let [k, v] of Object.entries(value)) {
      if (k !== 'usesElectron') {
        for (let [ki, vi] of Object.entries(v)) {
          if (ki === 'recommendations') {
            for (let [a, b] of Object.entries(vi)) {
              let record = {}
              record.name = k
              record.version = v.version
              record.guidance = b.desc
              record.references = b.references
              records.push(record)
            }
          }
        }
      }
    }
  }
  if (records !== []) {
    const csvWriter = createCsvWriter({path: path.resolve(outDir + '/suggestions.csv'), header: [{id: 'name', title: 'Package'}, {id: 'version', title: 'Version'}, {id: 'guidance', title: 'Guidance'}, {id: 'outcome', title: 'Outcome'}, {id: 'comments', title: 'Assessor Comments'}, {id: 'references', title: 'References'}]})
    csvWriter.writeRecords(records).then(() => {
    })
  }
}

module.exports.createSuggestions = createSuggestions
module.exports.retrieveDependencies = retrieveDependencies
module.exports.writeSuggestions = writeSuggestions
