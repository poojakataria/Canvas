var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_enroll(msg, callback) {

    console.log("In enroll.js - enroll :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateOne({ id: msg.courseid }, {
            $push: {
                coursemapping: {
                    sjsuid: msg.sjsuid,
                    role: msg.role,
                    status: msg.status,
                    order: 100
                }
            },
            $inc: {
                currEnrlNum: 1
            }
        },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log('Course not added');
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log("Successful Update ");
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_enroll = handle_enroll;