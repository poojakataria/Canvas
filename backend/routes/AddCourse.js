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
    //console.log('Add course')
    var payload = {
        "courseid": req.body.courseid,
        "coursename": req.body.coursename,
        "coursedept": req.body.coursedept,
        "coursedescription": req.body.coursedescription,
        "courseroom": req.body.courseroom,
        "coursecapacity": req.body.coursecapacity,
        "waitlistcapacity": req.body.waitlistcapacity,
        "courseterm": req.body.courseterm,
        "sjsuid": req.body.sjsuid,
        "courseid": req.body.courseid,
        "role": req.body.role
    };

    kafka.make_request('addcourse1_request', 'addcourse1_response', payload, function (err, results) {
        console.log("In index.js - addcourse1 : Results - " + results);
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