var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_updateorder(msg, callback) {

    console.log("In handle_updateorder.js -  handle_updateorder :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        var myCollection = mongo.collection('coursedetail');

        for (let i = 0; i < msg.courses.length; i++) {
            myCollection.updateOne(
                {
                    id: msg.courses[i].id,
                    "coursemapping.sjsuid": msg.sjsuid
                },
                {
                    $set: {
                        "coursemapping.$.order": i
                    }

                },
                function (err, result) {
                    //console.log(result);
                    if (err) {
                        console.log("error", err)
                        //callback(null, JSON.stringify(result))
                    }
                    else {
                        console.log("Successful updated the order ");
                        //callback(null, JSON.stringify(result))
                    }
                }
            );
        }

    });
}

exports.handle_updateorder = handle_updateorder;