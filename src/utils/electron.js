const path = require('path')
const process = require('process')
const cp =  require('child_process')

function electronegativity(pkg, output) {
  const electronegativityPath = path.resolve(`${process.cwd()}/../node_modules/@doyensec/electronegativity/dist/index.js`)
  let res = {}
  const dir = path.dirname(pkg)
  res = cp.execSync(`node ${electronegativityPath} -i ${dir} --output ${path.resolve(output + '/electron.csv')}`)
  return JSON.stringify(res)
}

module.exports.electronegativity = electronegativity
