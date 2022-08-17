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
    //console.log("Submitquiz", req.body);
    var payload = {
        "quizzes": req.body
    };
    //console.log('payload', payload)
    kafka.make_request('submitquiz1_request', 'submitquiz1_response', payload, function (err, results) {
        console.log("In index.js -submitquiz Results - " + results);
        if (err) {
            console.log("Error");
        }
        else {
            //console.log(results);
            res.send(results);
        }
    });
});

module.exports = router;