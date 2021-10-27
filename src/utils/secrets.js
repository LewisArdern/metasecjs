const path = require('path')
const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function semgrep(scanFolder, outDir) {
  const { stdout, stderr } = await exec(`semgrep --config ${path.resolve(__dirname+'/../config/semgrep/secrets')} --config "p/secrets" --json ${scanFolder}`)
  let data = JSON.parse(stdout)
  if(data.results.length > 0) {
    await fs.writeFile(path.resolve(outDir + '/secrets.json'), JSON.stringify(stdout))
    data.results.forEach(element => {
      console.log(`Secret found: ${element.extra.lines}`)
    });
  }
  return JSON.stringify(stdout)
}


module.exports.semgrepSecrets = semgrep
