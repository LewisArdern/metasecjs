const path = require('path')
const fs = require('fs')
const cp =  require('child_process')
function thirdPartyDependencies(dependencies) {
  let res = {}
  Object.keys(dependencies).forEach(function (e) {
    const dir = path.dirname(e)
    const dirList = fs.readdirSync(dir)
    if (!dirList.includes('package-lock.json' || 'npm-shrinkwrap.json' || 'yarn.lock')) {
      res[e] = 'Third-party audit not possible with npm or yarn as dependencies have not been installed'
    } else if (dirList.includes('yarn.lock')) {
      res[e] = cp.execSync(`cd ${dir} && yarn audit --json`)
    } else if (dirList.includes('package-lock.json' || 'npm-shrinkwrap.json')) {
      res[e] = cp.execSync(`cd ${dir} && npm audit --json`)
    }
  })
  return JSON.stringify(res)
}

module.exports.thirdPartyDependencies = thirdPartyDependencies
