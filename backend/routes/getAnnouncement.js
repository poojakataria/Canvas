var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "courseid": req.query.courseid,
        "sjsuid": req.query.sjsuid
    };
    //console.log('payload', payload)
    kafka.make_request('getannouncement1_request', 'getannouncement1_response', payload, function (err, results) {
        //console.log("In index.js - getannouncement Results - " + results);
        // console.log("Stringified results", JSON.stringify(results))
        if (err) {
            res.send();
        }
        else {
            res.send(results);
        }
    });
});

module.exports = router;