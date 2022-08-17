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

router.post('/', load.single('file'), function (req, res) {
    //console.log("req", req.file)
    if (req.file) {
        let fileUrl = `uploads/${req.file.filename}`
        var payload = {
            "courseid": req.body.courseid,
            "sjsuid": req.body.sjsuid,
            "assignmentid": req.body.assignmentid,
            "filename": req.body.filename,
            "fileUrl": fileUrl,
            "submissiondate": req.body.submissiondate
        };
        console.log('payload', payload)
        kafka.make_request('uploadassignment1_request', 'uploadassignment1_response', payload, function (err, results) {
            console.log("In index.js - uploadassignment Results - " + results);
            if (err) {
                console.log(err)
                console.log("Uploaded Assignment failed");
            }
            else {
                console.log("Successful Uploaded Assignment ");
                res.json({
                    fileUrl: fileUrl
                });

            }
        });
    }
    else
        res.status("409").json("No Files to Upload.");
})

module.exports = router;