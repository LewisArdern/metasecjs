const fs = require('fs')
const path = require('path')
const moment = require('moment')

function setupFolders(flags) {
  const outDir = path.resolve(`${flags.output}/${flags.project}/${moment().format('DD-MM-YYYY')}`)
  if (!fs.existsSync(path.resolve(flags.output))) {
    fs.mkdirSync(flags.output)
  }
  if (!fs.existsSync(path.resolve(`${flags.output}/${flags.project}`))) {
    fs.mkdirSync(path.resolve(`${flags.output}/${flags.project}`))
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }
  return outDir
}

module.exports.setupFolders = setupFolders

