const cp = require('child_process')
const os = require('os')
const fs = require('fs')

function checkRedos(files) {
  let result = {}
  if (os.platform() === 'linux') {
    files.forEach(f => {
      fs.writeFileSync('file.json', `{"file":"${f}"}`)
      let res = cp.execSync('export VULN_REGEX_DETECTOR_ROOT=/home/lewis/vuln-regex-detector && cd /home/lewis/vuln-regex-detector/bin &&  perl check-file.pl /mnt/c/Users/lewis/Documents/Projects/metasecjs/bin/file.json')
      res = JSON.parse(res)
      if (res.anyVulnRegexes > 0) {
        result[f] = res
      }
    })
  }
  if (os.platform() !== 'linux') {
    result = `Sorry ReDOS auditing is not supported at this time for ${os.platform()} only linux`
  }
  return result
}

module.exports.checkRedos = checkRedos
