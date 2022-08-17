var mongo = require('./mongo');
const mongoURL = mongo.mongoURL

function handle_getsubmissions(msg, callback) {

    console.log("In getsubmissions.js -  handle_getsubmissions :" + JSON.stringify(msg));
    let queryObj = [
        {
            $project: {
                assignments: 1
            }
        },
        {
            $unwind: "$assignments"
        },
        {
            $match: {
                "assignments.assignmentid": Number(msg.assignmentid)
            }
        },
        {
            $unwind: "$assignments.assignsubmission"
        },
        {
            $sort: {
                "assignments.assignsubmission.submissiondate": -1
            }
        },
        {
            $group: {
                _id: "$assignments.assignsubmission.sjsuid",
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
                name: "$people.name"
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

exports.handle_getsubmissions = handle_getsubmissions;