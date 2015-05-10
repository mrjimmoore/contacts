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

// find all contacts by page using selection criteria and sorted
app.get("/contactsByPageAndSorted", function (req, res) {
    var searchCriteria = JSON.parse(req.param("searchCriteria", "[]"));
    var sortColumn = req.param("sortColumn", "fullname");
    var sortDescending = JSON.parse(req.param("sortDescending", "false").toLowerCase());  // convert to boolean
    var pagesToSkip = req.param("pagesToSkip", 0);
    var rowsPerPage = req.param("rowsPerPage", 20);
    var rowsToSkip = rowsPerPage * pagesToSkip;
    var results = {};  // results to be returned on by callback

    console.log("--------------------------------" + new Date().toLocaleTimeString());
    //console.log("req.params string: %s", req.params)
    //console.log("req.params JSON: %j", req.params);
    //console.log("searchCriteria string: %s", searchCriteria);
    //console.log("searchCriteria JSON: %j", searchCriteria);
    //console.log("sortColumn: %s", sortColumn);
    //console.log("sortDescending: %s", sortDescending);
    //console.log("pagesToSkip: %s", pagesToSkip);
    //console.log("rowsPerPage: %s", rowsPerPage);

    // get the count of documents meeting the search criteria (not the count returned for the page)
    contactModel.count(searchCriteria, function (err, count) {
        if (err) {
            console.log(err);
        } else {
            results.docCount = count;
        }
    });

    // get the requested page of documents
    contactModel
        .find(searchCriteria)
        .sort([[sortColumn, sortDescending ? "descending" : "ascending"]])
        .skip(pagesToSkip >= 0 ? (pagesToSkip * rowsPerPage) : 0)
        .limit(rowsPerPage)
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                results.docs = docs;
                res.json(results);
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
        console.log("Contacts service listening on port 3000.");
    }
});