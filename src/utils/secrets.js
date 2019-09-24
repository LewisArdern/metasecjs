const path = require('path')
const fs = require('fs')
const cp =  require('child_process')
const config = require('../config/config')

function truffleHog(pkg) {
  // Check if .git exists then run truffle hog
  let res = {}
  const dir = path.dirname(pkg)
  console.log(cp.execSync(`python ${config.truffleHogLocation}/truffleHog.py ${dir}`))
  return JSON.stringify(res)
}

function rg(pkg) {
    let res = {}
    const dir = path.dirname(pkg)
    console.log(cp.execSync(`rg -ia "$1" -j 12 --no-filename --no-line-number --pretty`))
    return JSON.stringify(res)
  }

module.exports.truffleHog = truffleHog
module.exports.rg = rg