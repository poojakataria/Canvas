var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "assignmentid": req.query.assignmentid
    };
    //console.log('payload', payload)
    kafka.make_request('getsubmissions1_request', 'getsubmissions1_response', payload, function (err, results) {
        console.log("In index.js -getsubmissions Results - " + results);
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