var mongo = require('./mongo');
const mongoURL = mongo.mongoURL

function handle_viewassignment(msg, callback) {

    console.log("In handle_viewassignment.js -  handle_viewassignment :" + JSON.stringify(msg));
    let queryObj = [
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
            $limit: 1
        },
        {
            $project: {
                sjsuid: "$assignments.assignsubmission.sjsuid",
                assignmentid: "$assignments.assignmentid",
                filename: "$assignments.assignsubmission.filename",
                fileUrl: "$assignments.assignsubmission.fileUrl",
                submissiondate: "$assignments.assignsubmission.submissiondate"
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
                    //console.log(result);

                    callback(null, JSON.stringify(result))
                }
            });
    });
}

exports.handle_viewassignment = handle_viewassignment;