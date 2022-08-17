var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    let searchData = JSON.parse(req.query.searchData);
    console.log("searchData in search courses", searchData);
    var payload = {
        "searchData": searchData
    };
    console.log('payload', payload)
    kafka.make_request('searchcourses1_request', 'searchcourses1_response', payload, function (err, results) {
        console.log("In index.js - searchcourses : Results - " + results);
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