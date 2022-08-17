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
    console.log("UpdateProfile", req.body);
    var payload = {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "aboutme": req.body.aboutme,
        "city": req.body.city,
        "country": req.body.country,
        "company": req.body.company,
        "school": req.body.school,
        "hometown": req.body.hometown,
        "languages": req.body.languages,
        "gender": req.body.gender,
        "sjsuid": req.body.sjsuid
    };

    kafka.make_request('updateprofile_request', 'updateprofile_response', payload, function (err, results) {
        console.log("In index.js - updateprofile : Results - " + results);
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