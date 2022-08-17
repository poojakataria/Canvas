var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_drop(msg, callback) {

    console.log("In drop.js - drop :" + JSON.stringify(msg));
    let queryObj = {}
    if (msg.status == 'EN') {
        queryObj = { currEnrlNum: -1 }
    } else {
        queryObj = { currWLNum: -1 }
    }
    mongo.connect(mongoURL, function () {
        // console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateOne({ id: msg.courseid }, {
            $pull: {
                coursemapping: {
                    sjsuid: msg.sjsuid
                }
            },
            $inc: queryObj
        },
            function (err, result) {
                // console.log(result);
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

exports.handle_drop = handle_drop;