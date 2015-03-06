var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({ fullname: String, email: String }, { _id: true });
var contactModel = mongoose.model('contact', contactSchema);

app.get('/contacts', function (req, res) {
    contactModel.find(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

app.get('/contacts/:_id', function (req, res) {
    if (req.params._id) {
        contactModel.findById(req.params._id, function (err, doc) {
            if (err) {
                console.log('Error finding a document by _id.');
            } else {
                res.json(doc);
            }
        });
    }
});

app.post('/contacts', function (req, res) {
    contactModel.save(function (err, req, numberAffected) {
        if (err) {
            console.log(err);
        } else {
            console.log('Document inserted.');
        }
    })
});

app.post('/contacts/:_id', function (req, res) {
    contactModel.findOneAndUpdate({_id: req._id}, req, {upsert: true, "new": false}).exec(function (err, doc) {
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
        console.log('Listening on port 3000.');
    }
});