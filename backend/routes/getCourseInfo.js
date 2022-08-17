var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function (req, res) {
    //console.log("course information for", req.query);
    var payload = {
        "courseid": req.query.courseid
    };
    console.log('payload', payload)
    kafka.make_request('getcourseinfo1_request', 'getcourseinfo1_response', payload, function (err, results) {
        console.log("In index.js -getcourseinfo Results - " + results);
        if (err) {
            //console.log(err);
            res.end('get failed');
        }
        else {
            //console.log(results);
            res.send(results);
        }
    });
});

module.exports = router;