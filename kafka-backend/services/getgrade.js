var mongo = require('./mongo');
const mongoURL = mongo.mongoURL

function handle_getgrade(msg, callback) {

    console.log("In getgrade.js -  handle_getgrade :" + JSON.stringify(msg));
    let queryObj = [
        {
            $match: {
                id: msg.courseid,

            }
        },
        {
            $project: {
                assignments: 1
            }
        },
        {
            $unwind: "$assignments"
        },
        {
            $unwind: "$assignments.assignsubmission"
        },
        {
            $match: {
                "assignments.assignsubmission.sjsuid": msg.sjsuid
            }
        },
        {
            $sort: {
                "assignments.assignsubmission.submissiondate": -1
            }
        },
        {
            $group: {
                _id: "$assignments.assignmentid",
                firstsubmission: {
                    $first: "$assignments"
                }
            }
        },
        {
            $lookup: {
                from: "userinfo",
                localField: "firstsubmission.assignsubmission.sjsuid",
                foreignField: "sjsuid",
                as: "people"
            }
        },
        {
            $unwind: "$people"
        },
        {
            $project: {
                sjsuid: "$firstsubmission.assignsubmission.sjsuid",
                assignmentid: "$firstsubmission.assignmentid",
                filename: "$firstsubmission.assignsubmission.filename",
                fileUrl: "$firstsubmission.assignsubmission.fileUrl",
                submissiondate: "$firstsubmission.submissiondate",
                grade: "$firstsubmission.assignsubmission.grade",
                name: "$people.name",
                description: "$firstsubmission.description",
                maxpoints: "$firstsubmission.maxpoints"
            }
        }
    ]
    //console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                    callback(null, JSON.stringify(result))
                } else {
                    //console.log(result);

                    callback(null, JSON.stringify(result))
                }
            });
    });
}

exports.handle_getgrade = handle_getgrade;