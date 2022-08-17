var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("In Multer Storage : changeDestination = ");
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var load = multer({ storage: storage });
router.post('/', load.array(), function (req, res) {
    console.log('waitlistEnroll')
    var payload = {
        "sjsuid": req.body.sjsuid,
        "courseid": req.body.courseid,
        "role": req.body.role,
        "status": req.body.status
    };
    console.log('payload', payload)
    kafka.make_request('enrollwaitlist1_request', 'enrollwaitlist1_response', payload, function (err, results) {
        console.log("In index.js - enrollwaitlist: Results - " + results);
        // console.log("Stringified results", JSON.stringify(results))
        if (err) {
            res.end('Course Already Exists');
        }
        else {
            res.end('Course Added');
        }
    });
});

module.exports = router;