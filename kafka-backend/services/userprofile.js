var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_userprofile(msg, callback) {

    var res = [];
    //console.log("In userprofile.js - handle_userprofile :" + JSON.stringify(msg));

    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('userinfo');

        myCollection.findOne({ sjsuid: msg.sjsuId }, function (err, results) {
            if (err) {
                console.log("Error");
            } else {
                console.log("results", results)
                res.push(results)
                callback(null, JSON.stringify(res))
            }
        });
    });
}

exports.handle_userprofile = handle_userprofile;