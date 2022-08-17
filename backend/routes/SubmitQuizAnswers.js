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
    //console.log("SubmitquizAnswers", req.body);
    var payload = {
        "answers": req.body
    };
    console.log('payload', payload)
    kafka.make_request('submitquizanswers1_request', 'submitquizanswers1_response', payload, function (err, results) {
        console.log("In index.js -submitquizanswers Results - " + results);
        if (err) {
            console.log("Update failed", err);
        }
        else {
            console.log("Successful Update ");
            res.end("Answers submitted");
        }
    });
});
module.exports = router;