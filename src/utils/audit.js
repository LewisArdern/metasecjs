const path = require('path')
const fs = require('fs')
const cp =  require('child_process')
const uuid = require('uuid/v4')
function thirdPartyDependencies(dependencies, out) {
  let res = {}
  // TODO: Fix issue with only saving one audit result
  Object.keys(dependencies).forEach(function (e) {
    const dir = path.dirname(e)
    const dirList = fs.readdirSync(dir)
    if (!dirList.includes('package-lock.json' || 'npm-shrinkwrap.json' || 'yarn.lock')) {
      res[e] = 'Third-party audit not possible with npm or yarn as dependencies have not been installed'
    } else if (dirList.includes('yarn.lock')) {
      const audit = cp.exec(`cd ${dir} && yarn audit --json > ${path.resolve(out + '/' + uuid() + 'audit.json')}`)
      audit.stderr.on('data', function (code) {
        console.log('issue with audit' + code)
      })
      audit.on('close', function (code) {
      })
    } else if (dirList.includes('package-lock.json' || 'npm-shrinkwrap.json')) {
      const audit = cp.exec(`cd ${dir} && npm audit --json > ${path.resolve(out + '/audit.json')}`)
      audit.stderr.on('data', function (code) {
        console.log('issue with audit' + code)
      })
      audit.on('close', function (code) {
      })
    }
  })
  return JSON.stringify(res)
}

module.exports.thirdPartyDependencies = thirdPartyDependencies
