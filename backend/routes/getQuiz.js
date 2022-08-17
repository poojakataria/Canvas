var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "sjsuid": req.query.sjsuid,
        "courseid": req.query.courseid,
    };
    console.log('payload', payload)
    kafka.make_request('getquiz1_request', 'getquiz1_response', payload, function (err, results) {
        console.log("In index.js -getquiz Results - " + results);
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