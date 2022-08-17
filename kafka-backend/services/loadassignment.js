var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_loadassignment(msg, callback) {

    console.log("In handle_loadassignment.js -  handle_loadassignment :" + JSON.stringify(msg));

    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        let assignCollection = mongo.collection('assignmentcounter');
        assignCollection.findOneAndUpdate(
            { _id: "assignmentid" },
            { $inc: { seq: 1 } },
            { returnNewDocument: true }

            , function (err, result) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    //console.log("the counter in assignment", result.value.seq)
                    let myCollection = mongo.collection('coursedetail');
                    myCollection.updateOne({ id: msg.courseid }, {
                        $push: {
                            assignments: {
                                assignmentid: result.value.seq,
                                description: msg.description,
                                sjsuid: msg.sjsuid,
                                duedate: msg.duedate,
                                maxpoints: msg.maxpoints
                            }
                        }
                    },
                        function (err, result) {
                            //console.log(result);
                            if (err) {
                                console.log('Assignment not loaded');
                                callback(null, JSON.stringify(result))
                            }
                            else {
                                console.log('Assignment loaded');
                                callback(null, JSON.stringify(result))
                            }
                        }
                    );
                }
            })
    });
}

exports.handle_loadassignment = handle_loadassignment;