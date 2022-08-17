var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "quizid": req.query.quizid
    };
    //console.log('payload', payload)
    kafka.make_request('getquizdetail1_request', 'getquizdetail1_response', payload, function (err, results) {
        console.log("In index.js -getQuizDetail Results - " + results);
        if (err) {
            console.log("Error");
        }
        else {
            // console.log(results);
            res.send(results);
        }
    });
});

module.exports = router;