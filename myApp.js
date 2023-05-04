require('dotenv').config()

let express = require('express');
let app = express();

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time})
})

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next()
})

app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase')
    res.json({"message": "HELLO JSON"})
  else
    res.json({"message": "Hello json"})
})



app.use('/public', express.static(__dirname + '/public'))


























 module.exports = app;
