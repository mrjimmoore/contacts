var restify = require('restify');
var mongojs = require('mongojs');
var db = mongojs('myContacts', ['contact']);
var server = restify.createServer({ name: 'ContactsRestApi' });

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.get('/contacts', function (req, res, next) {
    db.contact.find(function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.get('/contacts/:_id', function (req, res, next) {
    db.contact.findOne({ _id: mongojs.ObjectId(req.params._id) }, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.post('/contacts', function (req, res, next) {
    db.contact.save(req.params, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.put('/contacts/:_id', function (req, res, next) {
    db.contact.findOne({ _id: mongojs.ObjectId(req.params._id) }, function (err, data) {
        var updProd = {};
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.contact.update({ _id: mongojs.ObjectId(req.params._id) }, updProd, { multi: false }, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/contacts/:_id', function (req, res, next) {
    db.contact.remove({ _id: mongojs.ObjectId(req.params._id) }, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(true));
    });
    return next();
});

server.listen(3000, function () {
    console.log('%s is now listening at %s', server.name, server.url);
});

module.exports = server;