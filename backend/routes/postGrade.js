var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    //console.log('postGrade', req.body);
    var payload = {
        "grade": req.body.grade,
        "assignmentid": req.body.assignmentid,
        "sjsuid": req.body.sjsuid
    };
    //console.log('payload', payload)
    kafka.make_request('postgrade1_request', 'postgrade1_response', payload, function (err, results) {
        console.log("In index.js -postgrade Results - " + results);
        if (err) {
            console.log('Grade not updated');
            res.end('Grade not updated');
        }
        else {
            console.log('Grade posted');
            res.end('Grade posted');
        }
    });
});

module.exports = router;