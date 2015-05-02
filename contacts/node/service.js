var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

mongoose.connect("mongodb://localhost/myApps");

var contactSchema = {fullname: String, email: String, notes: String};
var contactModel = mongoose.model("contact", contactSchema, "contact");

var app = express();
app.use(require("body-parser").urlencoded({extended: true}));
app.use(require("body-parser").json());
app.use(cors());

//// find all contacts
//app.get("/contacts", function (req, res) {
//    contactModel.find(function (err, docs) {
//        if (err) {
//            console.log(err);
//        } else {
//            res.json(docs);
//        }
//    });
//});

//// find all contacts sorted
//app.get("/contacts/:sortColumn/:sortDirection", function (req, res) {
//    var sortColumn = req.params.sortColumn;
//    var sortDirection = req.params.sortDirection;
//    contactModel.find().sort([[sortColumn, sortDirection]]).exec(function (err, docs) {
//        if (err) {
//            console.log(err);
//        } else {
//            res.json(docs);
//        }
//    });
//});

// find all contacts by criteria and sorted
app.get("/contacts", function (req, res) {
    var searchCriteria = JSON.parse(req.param("searchCriteria", null));
    var sortColumn = req.param("sortColumn", "fullname");
    var sortDirection = req.param("sortDirection", "ascending");

    //var searchCriteria = req.params.searchCriteria;
    //var sortColumn = req.params.sortColumn;
    //var sortDirection = req.params.sortDirection;

    console.log("--------------------------------");
    console.log("req.params string: %s", req.params)
    console.log("req.params JSON: %j", req.params);
    console.log("searchCriteria string: %s", searchCriteria);
    console.log("searchCriteria JSON: %j", searchCriteria);
    console.log("sortColumn string: %s", sortColumn);
    console.log("sortDirection string: %s", sortDirection);

    contactModel.find(searchCriteria)
        //.limit(2)
        .sort([[sortColumn, sortDirection]])
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        });
});

// find a contact by _id
app.get("/contacts/:_id", function (req, res) {
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

// add a new contact
app.post("/contacts", function (req, res) {
    var newContact = new contactModel(req.body);
    contactModel.create(newContact, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.json(newContact);
        }
    })
});

// update a contact by _id
app.put("/contacts/:_id", function (req, res) {
    contactModel.findByIdAndUpdate(req.params._id, req.body, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

// delete a contact by _id
app.delete("/contacts/:_id", function (req, res) {
    contactModel.findByIdAndRemove(req.params._id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

// start listening
app.listen(3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 3000.");
    }
});