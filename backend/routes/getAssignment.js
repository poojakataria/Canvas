var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    console.log('in get assignment');
    var payload = {
        "courseid": req.query.courseid,
        "sjsuid": req.query.sjsuid
    };
    console.log('payload', payload)
    kafka.make_request('getassignment1_request', 'getassignment1_response', payload, function (err, results) {
        console.log("In index.js - getAssignment Results - " + results);
        if (err) {
            console.log("Error");
        }
        else {
            console.log(results);
            res.send(results);
        }
    });

});
module.exports = router;