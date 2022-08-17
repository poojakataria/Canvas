var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_uploadassignment(msg, callback) {

    console.log("In handle_uploadassignment.js -  handle_uploadassignment :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateOne(
            {
                id: msg.courseid,
                "assignments.assignmentid": Number(msg.assignmentid)
            },
            {
                $push: {
                    "assignments.$.assignsubmission": {
                        sjsuid: msg.sjsuid,
                        filename: msg.filename,
                        fileUrl: msg.fileUrl,
                        submissiondate: msg.submissiondate,
                        grade: null
                    }
                }
            },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log("error", err)
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log("Successful Uploaded Assignment ");
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_uploadassignment = handle_uploadassignment;