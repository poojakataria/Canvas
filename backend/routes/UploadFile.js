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

router.post('/', load.single('lecturefile'), function (req, res) {
    //console.log("req", req.file)

    if (req.file) {
        let fileUrl = `uploads/${req.file.filename}`
        var payload = {
            "fileUrl": fileUrl,
            "sjsuid": req.body.sjsuid,
            "courseid": req.body.courseid,
            "filename": req.file.filename
        };

        kafka.make_request('uploadfile1_request', 'uploadfile1_response', payload, function (err, results) {
            console.log("In index.js - uploadfile : Results - " + results);
            //console.log("Stringified results", JSON.stringify(results))
            if (err) {
                res.send();
            }
            else {
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