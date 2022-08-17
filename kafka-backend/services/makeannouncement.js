var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;


function handle_makeannouncement(msg, callback) {

    console.log("In makeannouncement.js - makeannouncement :" + JSON.stringify(msg));
    let currDate = new Date()

    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateOne({ id: msg.courseid }, {
            $push: {
                announcement: {
                    sjsuid: msg.sjsuid,
                    topic: msg.topic,
                    announcement: msg.message,
                    createdat: currDate.toLocaleDateString('en-US')
                }
            }
        },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log('Announcement not stored');
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log('Annoucement posted');
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_makeannouncement = handle_makeannouncement;