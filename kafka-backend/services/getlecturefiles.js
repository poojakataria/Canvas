var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getlecturefiles(msg, callback) {

    console.log("In getlecturefiles.js - getlecturefiles :" + JSON.stringify(msg));
    let queryObj = [
        {
            $unwind: "$lecturefiles"
        },
        {
            $match: {
                id: msg.courseid
            }
        },
        {
            $lookup: {
                from: "userinfo",
                localField: "lecturefiles.sjsuid",
                foreignField: "sjsuid",
                as: "people"
            }
        },
        {
            $unwind: "$people"
        },
        {
            $project: {
                courseid: "$id",
                sjsuid: "$lecturefiles.sjsuid",
                filename: "$lecturefiles.filename",
                filepath: "$lecturefiles.filepath",
                createdat: "$lecturefiles.createdat",
                createdby: "$people.name"
            }
        }
    ]
    //console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');
        myCollection.aggregate(queryObj).toArray(
            function (err, result) {
                if (err) {
                    console.log("Error");
                    callback(null, JSON.stringify(result))
                } else {
                    //console.log(result);
                    callback(null, JSON.stringify(result))
                }
            });
    });
}

exports.handle_getlecturefiles = handle_getlecturefiles;