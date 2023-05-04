require('dotenv').config()

let bodyParser = require('body-parser');
let express = require('express');
let app = express();


app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next()
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time})
})

app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath)
})

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word})
})

app.route('/name')
  .get((req, res) => {
    firstName = req.query.first;
    lastName = req.query.last;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
  })
  .post((req, res) => {
    firstName = req.body.first;
    lastName = req.body.last;

    res.json({
      name: `${firstName} ${lastName}`
    });
  })

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase')
    res.json({"message": "HELLO JSON"})
  else
    res.json({"message": "Hello json"})
})



app.use('/public', express.static(__dirname + '/public'))


























 module.exports = app;
