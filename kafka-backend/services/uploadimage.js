var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_uploadimage(msg, callback) {

    console.log("In uploadimage.js - handle_uploadimage :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        // console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('userinfo');

        myCollection.updateOne({ sjsuid: msg.sjsuid }, {
            $set: {
                image: msg.imageUrl
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

exports.handle_uploadimage = handle_uploadimage;


