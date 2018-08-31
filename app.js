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

// Create a new camel
app.post('/camels', function(req, res) {
    var new_camel = {
        "_id": camels.length,
        "color": req.body.color,
        "position": req.body.position
    };
    camels.push(new_camel);
    res.status(201).json(new_camel);
});

// Return a list of all camels
app.get('/camels', function(req, res) {
    res.json({"camels": camels});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
