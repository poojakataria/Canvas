var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "courseid": req.query.courseid,
        "sjsuid": req.query.sjsuid
    };
    console.log('payload', payload)
    kafka.make_request('getlecturefiles1_request', 'getlecturefiles1_response', payload, function (err, results) {
        console.log("In index.js - getlecturefiles Results - " + results);
        // console.log("Stringified results", JSON.stringify(results))
        if (err) {
            console.log("Error");
        }
        else {
            //console.log(results);
            res.send(results);
        }
    });
});

module.exports = router;