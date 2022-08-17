var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    console.log('updateOrder', req.body);
    var payload = {
        "courses": req.body.courses,
        "sjsuid": req.body.sjsuid
    };
    console.log('payload', payload)
    kafka.make_request('updateorder1_request', 'updateorder1_response', payload, function (err, results) {
        console.log("In index.js -updateOrder Results - " + results);
        if (err) {
            console.log('Course not sorted');
            res.end(results);
        }
        else {
            console.log('Course sorted');
            res.end(results);
        }
    });
});

module.exports = router;