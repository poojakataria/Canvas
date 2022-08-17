var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    console.log('sendMessage', req.body);
    var payload = {
        "to": req.body.to,
        "from": req.body.from,
        "subject": req.body.subject,
        "message": req.body.message

    };
    ///console.log('payload', payload)
    kafka.make_request('sendmessage1_request', 'sendmessage1_response', payload, function (err, results) {
        console.log("In index.js - sendmessage Results - " + results);
        //console.log("Stringified results", JSON.stringify(results))
        if (err) {
            console.log('Message not stored');
            res.end('Message not stored');
        }
        else {
            console.log('Message added');
            res.end('Message Added');
        }
    });
});

module.exports = router;