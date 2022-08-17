var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "sjsuid": req.query.sjsuid,
        "role": req.query.role
    };
    //console.log('payload', payload)
    kafka.make_request('getcourses1_request', 'getcourses1_response', payload, function (err, results) {
        //console.log("In index.js - getcourses : Results - " + results);
        //console.log("Stringified results", JSON.stringify(results))
        if (err) {
            res.send();
        }
        else {
            res.send(results);
        }
    });
});

module.exports = router;