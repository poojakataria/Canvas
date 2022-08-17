var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getcourses(msg, callback) {

    console.log("In getcourses.js - handle_getcourses :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        let queryObj = [
            {
                $unwind: "$coursemapping"
            },
            {
                $match: {
                    "coursemapping.sjsuid": msg.sjsuid,
                    "coursemapping.role": msg.role
                }
            },
            {
                $sort: {
                    "coursemapping.order": 1
                }
            },
            {
                $addFields: {
                    status: "$coursemapping.status"
                }
            },
            {
                $project: {
                    coursemapping: 0,
                    lecturefiles: 0,
                    assignments: 0,
                    quiz: 0,
                    announcement: 0
                }
            }
        ]

        //console.log("getCourses Query Obj:", queryObj)
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                } else {
                    console.log("Success", result);
                    callback(null, JSON.stringify(result));
                }
            });
    });
}

exports.handle_getcourses = handle_getcourses;