const fg = require('fast-glob')
const slash = require('slash')

async function findFiles(file, regex) {
  const normalizedFile = slash(file + regex)
  const entries = await fg([`${normalizedFile}`], {dot: true})
  let result = []
  for (let [key, value] of Object.entries(entries)) {
    if (!value.includes('node_modules')) {
      result.push(value)
    }
  }
  return result
}

module.exports.findFiles = findFiles
