var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_postgrade(msg, callback) {

    console.log("In postgrade.js -  handle_postgrade :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateMany(
            {
                "assignments.assignsubmission.sjsuid": msg.sjsuid,
                "assignments.assignmentid": Number(msg.assignmentid)
            },
            {
                $set: {
                    "assignments.$[elem1].assignsubmission.$[elem].grade": msg.grade
                }
            },
            {
                arrayFilters: [{ "elem1.assignmentid": Number(msg.assignmentid) }, { "elem.sjsuid": { $eq: msg.sjsuid } }]
            },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log('Grade not updated');
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log('Grade posted');
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_postgrade = handle_postgrade;