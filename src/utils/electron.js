const path = require('path')
const fs = require('fs')
const cp =  require('child_process')

function electronegativity(pkg) {
  let res = {}
  const dir = path.dirname(pkg)
  res = cp.execSync(`electronegativity -i ${dir} --output test.csv`)
  return JSON.stringify(res)
}

module.exports.electronegativity = electronegativity
