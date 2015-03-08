var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");  // Facilitates cross port communication

mongoose.connect('mongodb://localhost/myContacts');
var contactSchema = { fullname: String,  email: String };
var contactModel = mongoose.model('contact', contactSchema, 'contact');

var app = express();
app.use(cors());

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
                console.log(err);
            } else {
                res.json(doc);
            }
        });
    }
});

app.post('/contacts', function (req, res) {
    console.log(req.params);
    contactModel.create(req.params, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.json(newContact);
        }
    })
});

app.put('/contacts/:_id', function (req, res) {
    console.log(req.params);
    var updatedContact = new contactModel();
    updatedContact = req.params;
    contactModel.findByIdAndUpdate(req.params._id, updatedContact, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

app.del('/contacts/:_id', function (req, res) {
    contactModel.findByIdAndRemove(req.params._id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

app.listen(3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on port 3000.');
    }
});