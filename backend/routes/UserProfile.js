var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    var payload = {
        "sjsuId": req.query.sjsuid
    }

    //console.log("in userProfile.js", req.query)
    kafka.make_request('userprofile_request', 'userprofile_response', payload, function (err, results) {
        //console.log("In index.js - userprofile : Results - " + results);
        if (err) {
            res.send();
        }
        else {
            res.send(results);
        }
    });

});

module.exports = router;