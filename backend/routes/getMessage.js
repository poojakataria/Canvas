var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "sjsuid": req.query.sjsuid
    };
    //console.log('payload', payload)
    kafka.make_request('getmessage1_request', 'getmessage1_response', payload, function (err, results) {
        console.log("In index.js - getmessage Results - " + results);
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