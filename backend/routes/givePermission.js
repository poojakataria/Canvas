var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/', function (req, res) {
    //console.log("permit student", req.body);
    var payload = {
        "sjsuid": req.body.sjsuid,
        "courseid": req.body.courseid,
        "role": req.body.role,
        "courseid": req.body.courseid
    };
    console.log('payload', payload)
    kafka.make_request('givepermission1_request', 'givepermission1_response', payload, function (err, results) {
        console.log("In index.js -givepermission Results - " + results);
        if (err) {
            //console.log(err);
            res.end('update failed');
        }
        else {
            console.log('Successful enrollment');
            res.end('Successful enrollment');
        }
    });
});
module.exports = router;