var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    console.log("In create user")
    var payload = {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.user,
        "password": req.body.password,
        "sjsuId": req.body.sjsuId
    };
    console.log("In create user , payload", payload)
    kafka.make_request('signup1_request', 'signup1_response', payload, function (err, results) {
        console.log("In index.js - signup : Results - " + results);
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