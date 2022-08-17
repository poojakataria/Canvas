var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_givepermission(msg, callback) {

    console.log("In givepermission.js -  handle_givepermission :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateOne(
            {
                id: msg.courseid,
                "coursemapping.sjsuid": msg.sjsuid,
                "coursemapping.role": msg.role
            },
            {
                $set: {
                    "coursemapping.$.status": "EN"
                },
                $inc: {
                    currEnrlNum: 1,
                    currWLNum: -1,
                    capacity: 1
                }
            },
            function (err, result) {
                // console.log(result);
                if (err) {
                    //console.log(err);
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log('Successful enrollment');
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_givepermission = handle_givepermission;