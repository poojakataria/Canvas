var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getstudents(msg, callback) {

    console.log("In getstudents.js - getstudents :" + JSON.stringify(msg));
    let queryObj = [
        {
            $unwind: "$coursemapping"
        },
        {
            $match: {
                id: msg.courseid,
                "coursemapping.role": "student"
            }
        },
        {
            $lookup: {
                from: "userinfo",
                localField: "coursemapping.sjsuid",
                foreignField: "sjsuid",
                as: "people"
            }
        },
        {
            $unwind: "$people"
        },
        {
            $project: {
                "studentname": "$people.name",
                "coursename": "$name",
                "sjsuid": "$coursemapping.sjsuid",
                "role": "$coursemapping.role",
                "status": "$coursemapping.status"
            }
        }
    ]
    //console.log("query object in getstudents", queryObj)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                    callback(null, JSON.stringify(result))
                } else {
                    console.log("Success", result);
                    callback(null, JSON.stringify(result));
                }
            });
    });
}

exports.handle_getstudents = handle_getstudents;