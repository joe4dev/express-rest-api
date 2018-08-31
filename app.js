var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Parse requests of content-type 'application/json'
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Camels storage array
var camels = [];

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
