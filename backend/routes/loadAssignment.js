var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    //console.log('loadAssignment', req.body);
    var payload = {
        "courseid": req.body.courseid,
        "sjsuid": req.body.sjsuid,
        "description": req.body.description,
        "duedate": req.body.duedate,
        "maxpoints": req.body.maxpoints,
    };
    console.log('payload', payload)
    kafka.make_request('loadassignment1_request', 'loadassignment1_response', payload, function (err, results) {
        console.log("In index.js - loadassignment Results - " + results);
        //console.log("Stringified results", JSON.stringify(results))
        if (err) {
            console.log('Assignment not loaded');
            res.end('Assignment not loaded');
        }
        else {
            console.log('Assignment loaded');
            res.end('Assignment loaded');
        }
    });
});

module.exports = router;
