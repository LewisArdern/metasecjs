const cp = require('child_process')
const os = require('os')
const fs = require('fs')
const path = require('path')
const config = require('../config/config')
function checkRedos(files, out) {
  let result = {}
  const pattern = path.resolve(out + '/regexPattern.json')
  const regex = path.resolve(out + '/regex.json')
  if (os.platform() === 'linux') {
    files.forEach(f => {
      console.log(`Testing ${f}`)
      fs.writeFileSync(pattern, `{"file":"${f}"}`)
      let res = cp.execSync(`export VULN_REGEX_DETECTOR_ROOT=${config.redosFileLocation} && cd ${config.redosFileLocation}/bin &&  perl check-file.pl ${pattern}`)
      res = JSON.parse(res)
      if (res.anyVulnRegexes > 0) {
        result[f] = res
      }
    })
    if (result !== {}) {
      fs.writeFileSync(regex, JSON.stringify(result))
      fs.unlinkSync(pattern)
    }
  }
  if (os.platform() !== 'linux') {
    result = `Sorry ReDOS auditing is not supported at this time for ${os.platform()} only linux`
  }
  return result
}

module.exports.checkRedos = checkRedos
