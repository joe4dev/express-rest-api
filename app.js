var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Schema = mongoose.Schema;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/animals', { useNewUrlParser: true });

// Parse requests of content-type 'application/json'
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Camels storage array
var camels = [];

// Mongoose schema
var camelSchema = new Schema({
    color: { type: String },
    position: { type: Number }
});
// Mongoose model
var Camel = mongoose.model('camels', camelSchema);

// Create a new camel
app.post('/camels', function(req, res, next) {
    var camel = new Camel(req.body);
    camel.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(camel);
    });
});

// Return a list of all camels
app.get('/camels', function(req, res, next) {
    Camel.find(function(err, camels) {
        if (err) { return next(err); }
        res.json({"data": camels});
    });
});

// Return the camel with the given ID
app.get('/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(req.params.id, function(err, camel) {
        if (err) { return next(err); }
        if (camel == null) {
            return res.status(404).json({"message": "Camel not found"});
        }
        res.json(camel);
    });
});

// Update the camel with the given ID
app.put('/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, camel) {
        if (err) { return next(err); }
        if (camel == null) {
            return res.status(404).json({"message": "Camel not found"});
        }
        camel.color = req.body.color;
        camel.position = req.body.position;
        camel.save();
        res.json(camel);
    });
});

// Partially update the camel with the given ID
app.patch('/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, camel) {
        if (err) { return next(err); }
        if (camel == null) {
            return res.status(404).json({"message": "Camel not found"});
        }
        camel.color = (req.body.color || camel.color);
        camel.position = (req.body.position || camel.position);
        camel.save();
        res.json(camel);
    });
});

// Delete the camel with the given ID
app.delete('/camels/:id', function(req, res) {
    var id = req.params.id;
    var camel = camels[id];
    delete camels[id];
    res.json(camel);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
