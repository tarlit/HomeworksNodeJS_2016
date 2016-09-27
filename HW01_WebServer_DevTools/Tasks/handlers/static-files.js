let fs = require('fs')
let url = require('url')
let typeParser = require('./../contentTypeParser')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName.startsWith('/content/')) {
    fs.readFile('.' + req.pathName, (err, data) => {
      let extention = req.pathName.substring(req.pathName.lastIndexOf('.'))
      let type = typeParser.getType(extention)

      if (err || !type) {
        res.writeHead(404, {
          'Content-type': 'text/plant'
        })
        res.write('Error 404: file not found')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-Type': type
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
