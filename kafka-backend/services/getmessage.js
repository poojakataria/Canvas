var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getmessage(msg, callback) {

    console.log("In getmessage.js - getmessage :" + JSON.stringify(msg));
    let queryObj = [
        {
            $lookup: {
                from: "userinfo",
                localField: "to",
                foreignField: "email",
                as: "people"
            }
        },
        {
            $unwind: "$people"
        },
        {
            $match: {
                "people.sjsuid": msg.sjsuid
            }
        },
        {
            $lookup: {
                from: "userinfo",
                localField: "from",
                foreignField: "sjsuid",
                as: "fromPeople"
            }
        },
        {
            $unwind: "$fromPeople"
        },
        {
            $project: {
                "from": "$fromPeople.name",
                "subject": "$subject",
                "message": "$message",
                "createdat": "$createdat"
            }
        }
    ]
    //console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('messages');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                    callback(null, JSON.stringify(result))
                } else {
                    callback(null, JSON.stringify(result))
                }
            });
    });
}

exports.handle_getmessage = handle_getmessage;