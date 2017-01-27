const express = require('express')
var app = express()

app.use(express.static('src'))
app.use('/package.json', express.static('package.json'))
app.use('/jspm_packages', express.static('jspm_packages'))
app.use('/jspm.browser.js', express.static('jspm.browser.js'))
app.use('/jspm.config.js', express.static('jspm.config.js'))

app.get('*', function(req, res) {
  res.sendfile('dist/index.html')
})

app.listen(8080)
