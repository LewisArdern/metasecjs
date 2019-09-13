const fs = require('fs')
const db = JSON.parse(fs.readFileSync(`${getDirname()}/database.json`))

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
module.exports.createSuggestions = createSuggestions
module.exports.retrieveDependencies = retrieveDependencies
