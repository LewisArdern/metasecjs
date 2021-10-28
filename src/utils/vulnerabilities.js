const path = require('path')
const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function semgrep(scanDir, outDir) {
  const { stdout, stderr } = await exec(`semgrep  --exclude node_modules --config ${path.resolve(__dirname+'/../config/semgrep/vulns')} --config "p/owasp-top-ten"  --config "p/eslint-plugin-security" --config "p/react" --config "p/nodejs" --config "p/command-injection"  --config "p/nodejsscan" --config "p/javascript" --config "p/xss" --json ${scanDir}`)
  let data = JSON.parse(stdout)
  if(data.results.length > 0) {
    await fs.writeFile(path.resolve(outDir + '/vulns.json'), JSON.stringify(stdout))
    data.results.forEach(element => {
      console.log(`Issue found: ${element.extra.message}`)
      console.log(`Path: ${element.path}`)
      console.log(`Line: ${element.start.line}`)
      console.log(`Code: ${element.extra.lines}\n`)
    });
  }
  return JSON.stringify(stdout)
}


module.exports.semgrep = semgrep
