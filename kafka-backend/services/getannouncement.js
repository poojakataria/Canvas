var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getannouncement(msg, callback) {

    console.log("In getannouncement.js - getannouncement :" + JSON.stringify(msg));
    let queryObj = [
        {
            $unwind: "$announcement"
        },
        {
            $match: {
                id: msg.courseid
            }
        },
        {
            $project: {
                courseid: "$id",
                sjsuid: "$announcement.sjsuid",
                topic: "$announcement.topic",
                announcement: "$announcement.announcement",
                createdat: "$announcement.createdat"
            }
        }
    ]
    // console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                    callback(null, JSON.stringify(result))
                } else {
                    callback(null, JSON.stringify(result))
                }
            });
    });
}

exports.handle_getannouncement = handle_getannouncement;