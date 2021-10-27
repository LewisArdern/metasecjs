const cp = require('child_process')
const os = require('os')
const fs = require('fs').promises;
const path = require('path')
const { check } = require("@makenowjust-labo/recheck");

async function semgrep(scanFolder) {
  // TODO: Change to pull from config
  let res = cp.execSync(`semgrep --config ${path.resolve(__dirname+'/../config/semgrep/detection/regex.yaml')} --json ${scanFolder}`)
  return res
}

async function checkRedos(files, outDir) {
  console.log('Checking for ReDoS:')
  let results = await semgrep(files)
  let semgrepData = JSON.parse(results)
  let output = {}
  if(semgrepData.results.length > 0) {
    let i = 0;
    semgrepData.results.forEach(element => {
        let redosData = check(element.extra.message, "")
        if (redosData.status === 'vulnerable') {
            output[i] = {status:redosData.status, regex:redosData.source, path:element.path, line:element.start.line};
            i++
        }
    });
   console.log(output)
   await fs.writeFile(path.resolve(outDir + '/redos.json'), JSON.stringify(output))
  }

  return output
}

module.exports.checkRedos = checkRedos
