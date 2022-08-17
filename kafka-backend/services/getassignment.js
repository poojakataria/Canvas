var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getassignment(msg, callback) {

    console.log("In handle_getassignment.js -  handle_getassignment :" + JSON.stringify(msg));
    let queryObj = [
        {
            $unwind: "$assignments"
        },
        {
            $match: {
                id: msg.courseid
            }
        },
        {
            $project: {
                assignmentid: "$assignments.assignmentid",
                description: "$assignments.description",
                duedate: "$assignments.duedate",
                maxpoints: "$assignments.maxpoints",
                sjsuid: "$assignments.sjsuid",
                courseid: "$id"
            }
        }
    ]
    //console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        // console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, results) {
                if (err) {
                    console.log("Error");
                    callback(null, JSON.stringify(results))
                } else {
                    console.log(results);
                    callback(null, JSON.stringify(results))
                }
            });
    });
}

exports.handle_getassignment = handle_getassignment;