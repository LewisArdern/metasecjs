const cp = require('child_process')
const path = require('path')
const process = require('process')

function checkLint(dir, out) {
  const eslint = path.resolve(`${process.cwd()}/../node_modules/eslint/bin/eslint.js`)
  const securityRules = path.resolve(`${process.cwd()}/../src/utils/lintRules.js`)
  const ignoreRules = path.resolve(`${process.cwd()}/../src/utils/.lintIgnore`)
  process.chdir(dir)
  const lint = cp.exec(`node ${eslint} -c ${securityRules} --ignore-path ${ignoreRules} --format=json . > ${path.resolve(out + '/lint.json')}`)
  lint.stderr.on('data', function (code) {
    console.log('issue with linting' + code)
  })
  lint.on('close', function (code) {
    console.log('Linting was successful')
  })
}

module.exports.checkLint = checkLint
