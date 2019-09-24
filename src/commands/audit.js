const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const path = require('path')
const fs = require('fs')
const moment = require('moment')

const regex = require('../utils/regex')
const helper = require('../utils/helper')
const audit = require('../utils/audit')
const redos = require('../utils/redos')
const electron = require('../utils/electron')
const lint = require('../utils/lint')
const secrets = require('../utils/secrets')
class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)
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
    // Retrieve package.json(s)
    const packages = await regex.findFiles(flags.dir, '/**/package.json')
    // Read package.json and match to database for suggestions
    if (packages !== []) {
      this.log(`Found ${packages.length} package.json, beginning audit`)
      this.log('Checking Database for potential problem areas with identified dependencies')
      const suggestions = helper.createSuggestions(packages)
      await helper.writeSuggestions(suggestions, outDir)
      this.log('Auditing third-party dependencies')
      const dependencies = helper.retrieveDependencies(packages)
      audit.thirdPartyDependencies(dependencies, outDir)
      const rd = await cli.confirm('Do you want to check for ReDoS?')
      if (rd === true) {
        this.log('Checking for ReDoS (This can take some time for large projects, so go get a coffee)')
        const jsFiles = await regex.findFiles(flags.dir, '/**/*.js')
        redos.checkRedos(jsFiles, outDir)
      }
      for (let [key, value] of Object.entries(suggestions)) {
        if (value.usesElectron) {
          this.log('Application uses Electron, running dyosec')
          electron.electronegativity(key, outDir)
        }
      }
    }
    const s = await cli.confirm('Do you want to look for Secrets?')
    if (s === true) {
      const git = await regex.findFiles(flags.dir, '/**/.git')
      console.log(Object.entries(git).includes([]))
      if (git.length !== 0) {
        this.log('.git found, running truffleHog')
        const secretList = secrets.truffleHog(flags.dir)
        this.log(secretList)
      }
      // TODO: ripgrep
    }
    this.log('Running security linting against directory')
    lint.checkLint(flags.dir, outDir)
  }
}

AuditCommand.description = 'Audit JavaScript applications for security issues'

AuditCommand.flags = {
  project: flags.string({
    char: 'p',
    required: true,
    description: 'Project name',
  }),
  dir: flags.string({
    char: 'd',
    required: true,
    description: 'Directory to scan',
  }),
  output: flags.string({
    char: 'o',
    required: true,
    description: 'Where to save the results',
  }),
}

module.exports = AuditCommand
