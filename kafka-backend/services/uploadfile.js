var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_uploadfile(msg, callback) {

    console.log("In uploadfile.js - handle_uploadfile :" + JSON.stringify(msg));
    let currDate = new Date()

    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.updateOne({ id: msg.courseid }, {
            $push: {
                lecturefiles: {
                    sjsuid: msg.sjsuid,
                    filename: msg.filename,
                    filepath: msg.fileUrl,
                    createdat: currDate.toLocaleDateString('en-US')
                }
            }
        },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log("Update failed");
                }
                else {
                    console.log("Successful Update ");
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_uploadfile = handle_uploadfile;