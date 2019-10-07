const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')

const regex = require('../utils/regex')
const setup = require('../utils/setup')
const helper = require('../utils/helper')
const audit = require('../utils/audit')
const redos = require('../utils/redos')
const electron = require('../utils/electron')
const lint = require('../utils/lint')
const secrets = require('../utils/secrets')

class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)

    const outDir = setup.setupFolders(flags)
    // Retrieve package.json(s)
    const packages = await regex.findFiles(flags.dir, '/**/package.json')
    // Read package.json and match to database for suggestions
    if (packages !== []) {
      this.log(`Found ${packages.length} package.json, beginning audit`)
      this.log('Checking Database for potential problem areas with identified dependencies')
      // Looks at the package.json file for matches against the 'repository' and reports any security concerns with a particular package
      const suggestions = helper.createSuggestions(packages)
      await helper.writeSuggestions(suggestions, outDir)
      this.log('Auditing third-party dependencies')
      // Runs third-party dependency checking against package.json files that were identified
      const dependencies = helper.retrieveDependencies(packages)
      audit.thirdPartyDependencies(dependencies, outDir)
      // Command-line verification if ReDoS checking should be performed
      const rd = await cli.confirm('Do you want to check for ReDoS?')
      if (rd === true) {
        this.log('Checking for ReDoS (This can take some time for large projects, so go get a coffee)')
        // Globs all of the JavaScript files in the provided directory and will run each file against vuln-regex-detect
        const jsFiles = await regex.findFiles(flags.dir, '/**/*.js')
        redos.checkRedos(jsFiles, outDir)
      }
      // Currently very hacky but identifies the use of electron in the package.json file, if it exists runs electronegativity
      for (let [key, value] of Object.entries(suggestions)) {
        if (value.usesElectron) {
          this.log('Application uses Electron, running dyosec')
          electron.electronegativity(key, outDir)
        }
      }
    }
    // Command-line verification if secrets checking should be performed

    const s = await cli.confirm('Do you want to look for Secrets?')
    if (s === true) {
      // TODO: Fix regex, fast-glob *.git does not find hidden files
      // const git = await regex.findFiles(flags.dir, '/*\\.git')
      // this.log(git)
      // if (git.length !== 0) {
      //   this.log('.git found, running truffleHog')
      //   secrets.truffleHog(git, outDir)
      // }
      secrets.rg(flags.dir, outDir)
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
