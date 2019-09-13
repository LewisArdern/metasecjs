const fs = require('fs')
const { Command, flags } = require('@oclif/command')
const glob = require('glob')
let list = ''

class SuggestCommand extends Command {
  async run() {
    const { flags } = this.parse(SuggestCommand)
    const directory = flags.dir || this.log('please supply --dir= to scan')
    const project = flags.project || this.log('please supply a --project= name')

    if (directory && project) {
      // Recursively go through the folder to find package.json files
      glob(`${directory}/**/package.json`, function (err, files) {
        if (err) {
          console.log('Error reading directory')
        }
        // If there are package.json files, read them and check to see if
        // They match against the database/store
        if (files.length !== 0) {
          files.forEach(function (file) {
            // fix this later to actually append each file and then uniquely add deps to a list..
            list = fs.readFileSync(file)
          })
          const result = JSON.parse(list)
          const db = JSON.parse(fs.readFileSync(`${getDirname()}/../utility/database.json`))
          const dblist = Object.keys(db.dependencies)
          Object.keys(result.dependencies).forEach(function (e) {
            if (dblist.includes(e)) {
              db.dependencies[e].issues.forEach(e => console.log(e))
              console.log(`${e} usage detected ${db.dependencies[e].issues.forEach(e => e)}`)
            }
          })
        }
        if (files.length === 0) {
          console.log('No package.json identified :(')
        }
      })
    }
  }
}

function getDirname() {
  return __dirname
}
SuggestCommand.description = `Reviews a package.json file and provides a checklist of potential implementation issues  
...
                Extra documentation goes here
                  `

SuggestCommand.flags = {
  dir: flags.string({
    char: 'd',
  }),
  project: flags.string({
    char: 'p',
  }),
  name: flags.string({ char: 'n', description: 'name to print' }),
}

module.exports = SuggestCommand
