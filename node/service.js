var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myContacts', function (err) {
    if (err) {
        console.log('Error connecting to database.');
    } else {
        console.log('Connected to database.');
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error'));

var contactSchema = mongoose.Schema({
    _id: String,
    fullname: String,
    email: String
});

var contactModel = mongoose.model('contact', contactSchema);

var app = express();

app.get('/contacts', function (req, res) {
    contactModel.findOne({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/contacts/:_id', function (req, res) {
    if (req.params._id) {
        contactModel.findById(req.params._id, function (err, doc) {
            res.json(doc);
        });
    }
});

app.post('/contacts', function (req, res) {
    contactModel.save(function (err, req, numberAffected) {
        if (err) {
            console.log('Error inserting document.');
        } else {
            console.log('Document inserted.');
        }
    })
});

app.post('/contacts/:_id', function (req, res) {
    contactModel.findOneAndUpdate({_id: req._id}, req, {upsert: true, "new": false}).exec(function(err, doc) {
        if (err) {
            console.log('Error updating document.');
        } else {
            console.log('Document updated.');
        }
    });
});

app.listen(3000, function (err) {
    if (err) {
        console.log('Error listening on port 3000.');
    } else {
        console.log('Listening on port 3000.');    }
});
