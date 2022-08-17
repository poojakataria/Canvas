var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "assignmentid": req.query.assignmentid,
        "sjsuid": req.query.sjsuid
    };
    //console.log('payload', payload)
    kafka.make_request('viewassignment1_request', 'viewassignment1_response', payload, function (err, results) {
        console.log("In index.js - viewAssignment Results - " + results);
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