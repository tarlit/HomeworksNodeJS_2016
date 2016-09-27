let fs = require('fs')
let url = require('url')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/') {
    fs.readFile('./content/index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-type': 'text/plant'
        })
        res.write('Error 404: file not found')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
