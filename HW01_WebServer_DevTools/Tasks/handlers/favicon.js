let fs = require('fs')
let url = require('url')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/favicon.ico') {
    fs.readFile('./content/favicon.png', (err, data) => {
      if (err) console.error(err)

      res.writeHead(200, {
        'Content-Type': 'image/png'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
