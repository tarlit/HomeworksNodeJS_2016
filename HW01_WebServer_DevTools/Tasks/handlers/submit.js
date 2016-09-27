let url = require('url')
let fs = require('fs')
let qs = require('querystring')
let picData = require('./../data')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  if (req.pathName === '/submit' && req.method === 'POST') {
    let obj = {}
    req.on('data', function (chunk) {
      let querystring = qs.unescape(chunk)
      querystring.split('&').forEach(function (value) {
        let params = value.split('=')
        obj[params[0]] = params[1]
      })

      picData.addData(obj)
    })

    req.on('end', function () {      
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
    })
  } else {
    return true
  }
}
