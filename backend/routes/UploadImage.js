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

router.post('/', load.single('image'), function (req, res) {
    console.log("req", req.file)

    if (req.file) {
        let imageUrl = `uploads/${req.file.filename}`
        var payload = {
            "imageUrl": imageUrl,
            "sjsuid": req.body.sjsuid
        };

        kafka.make_request('uploadimage_request', 'uploadimage_response', payload, function (err, results) {
            console.log("In index.js - uploadimage : Results - " + results);
            //console.log("Stringified results", JSON.stringify(results))
            if (err) {
                res.send();
            }
            else {
                res.json({
                    imageUrl: imageUrl
                });
            }
        });
    }
    else
        res.status("409").json("No Files to Upload.");
})

module.exports = router;