const {Command, flags} = require('@oclif/command')
const regex = require('../utils/regex')
const helper = require('../utils/helper')
const audit = require('../utils/audit')
const redos = require('../utils/redos')
const electron = require('../utils/electron')
const secrets = require('../utils/secrets')
class AuditCommand extends Command {
  async run() {
    const {flags} = this.parse(AuditCommand)
    // Retrieve package.json(s)
    const packages = await regex.findFiles(flags.dir, '/**/package.json')
    // Read package.json and match to database for suggestions
    if (packages !== []) {
      this.log(`Found ${packages.length} package.json, beginning audit`)
      this.log('Checking Database for potential problem areas with identified dependencies')
      const suggestions = helper.createSuggestions(packages)
      this.log('Auditing third-party dependencies')
      const dependencies = helper.retrieveDependencies(packages)
      // const thirdparty = audit.thirdPartyDependencies(dependencies)
      // this.log(thirdparty)
      this.log('Checking for ReDoS (This can take some time for large projects, so go get a coffee)')
      // const jsFiles = await regex.findFiles(flags.dir, '/**/*.js')
      // const re = redos.checkRedos(jsFiles)
      // this.log(re)
      let el = {}
      for (let [key, value] of Object.entries(suggestions)) {
        if (value.usesElectron) {
          this.log('Application uses Electron, running dyosec')
          el = electron.electronegativity(key)
        }
      }
    }
    this.log('Checking for secrets')
    const secretList = secrets.truffleHog(flags.dir)
    this.log(secretList)
    this.log('Running security linting against directory')
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
    description: 'Where to save the results, defaults to current directory',
  }),
}

module.exports = AuditCommand
