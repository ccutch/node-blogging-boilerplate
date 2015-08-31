var express = require('express')
var articleController = require('./lib/articleController')
var app = express()
var port = process.env.PORT || 5150

// Controllers
articleController.createRoutes(app)
app.get('/', function(req, res) {
  res.end('Welcome to the home page.')
})

app.use(function(req, res) {
  res.status(404)
  res.send('Page not found')
})
app.use(function(err, req, res) {
  res.status(500)
  res.send('ERROR: ' + err)
})

app.listen(port, function() { console.log('server online.') })
