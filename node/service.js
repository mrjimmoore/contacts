var restify = require('restify');
var mongojs = require('mongojs');
var db = mongojs('myContacts', ['contact']);
var server = restify.createServer({name: 'contacts-rest-api'});

// Make sure to install the following as they are dependencies.
// npm install restify
// npm install mongojs

server
    .use(restify.acceptParser(server.acceptable))
    .use(restify.fullResponse())
    .use(restify.queryParser())
    .use(restify.bodyParser())
;

server.get('/contact', function (req, res, next) {
    db.contact.find(function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.get('/contact/:_id', function (req, res, next) {
    var ObjectId = mongojs.ObjectId;
    db.contact.findOne({ _id: ObjectId(req.params._id) }, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.post('/contact', function (req, res, next) {
    var contact = req.params;
    db.contacts.save(contact, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.put('/contact/:_id', function (req, res, next) {
    var ObjectId = mongojs.ObjectId;
    db.contact.findOne({ _id: ObjectId(req.params._id) }, function (err, data) {
        var updProd = {};
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.contact.update({ _id: ObjectId(req.params._id) }, updProd, { multi: false }, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/contact/:_id', function (req, res, next) {
    var ObjectId = mongojs.ObjectId;
    db.contact.remove({ _id: ObjectId(req.params._id) }, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(true));
    });
    return next();
});

server.listen(3000, function () {
    console.log('%s is now listening at %s', server.name, server.url);
});

module.exports = server;