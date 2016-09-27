let types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg'
}

function getType (type) {
  return types[type]
}

module.exports = {
  getType: getType
}
