const path = require('path')
const fs = require('fs')
const cp =  require('child_process')
const config = require('../config/config')

function truffleHog(git, outdir) {
  // Check if .git exists then run truffle hog, fast-glob does not find hidden files so workaround required
  let res = {}
  const dir = path.dirname(git)
  res = cp.execSync(`python ${config.truffleHogLocation}/truffleHog.py --regex --entropy=False ${dir}`)
  console.log('result'+res)
  return JSON.stringify(res)
}

function rg(path, outdir) {
    let res = {}
    let patterns = fs.readFileSync('../src/utils/secretRules', 'utf-8')
    patterns = patterns.split('\r\n')
    patterns.forEach(element => {
      const ripgrep =  cp.exec(`cd ${path} && rg -ia "${element}" -j 12 --no-filename --no-line-number --pretty >> ${outdir}/ripgrep.txt`)
      ripgrep.stdout.on('data', function (code) {
      })
      ripgrep.stderr.on('data', function (code) {
        console.log('issue with ripgrep' + code)
      })
      ripgrep.on('close', function (code) {
      })
    })
    return JSON.stringify(res)
  }

module.exports.truffleHog = truffleHog
module.exports.rg = rg
