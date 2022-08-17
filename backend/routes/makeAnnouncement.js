var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    console.log('makeAnnouncement', req.body);
    var payload = {
        "courseid": req.body.courseid,
        "sjsuid": req.body.sjsuid,
        "topic": req.body.topic,
        "message": req.body.message

    };
    console.log('payload', payload)
    kafka.make_request('makeannouncement1_request', 'makeannouncement1_response', payload, function (err, results) {
        console.log("In index.js - makeannouncement Results - " + results);
        // console.log("Stringified results", JSON.stringify(results))
        if (err) {
            console.log('Announcement not stored');
            res.end('Announcement not stored');
        }
        else {
            console.log('Annoucement posted');
            res.end('Annoucement Added');
        }
    });
});
module.exports = router;