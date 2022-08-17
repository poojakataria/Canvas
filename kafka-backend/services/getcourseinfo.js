var mongo = require('./mongo');
const mongoURL = mongo.mongoURL

function handle_getcourseinfo(msg, callback) {

    console.log("In getcourseinfo.js -  handle_getcourseinfo :" + JSON.stringify(msg));

    let queryObj = [
        {
            $match: {
                id: msg.courseid
            }
        },
        {
            $unwind: "$coursemapping"
        },
        {
            $match: {
                "coursemapping.role": "faculty"
            }
        },
        {
            $lookup: {
                from: "userinfo",
                localField: "coursemapping.sjsuid",
                foreignField: "sjsuid",
                as: "people"
            }
        },
        {
            $unwind: "$people"
        },
        {
            $project: {
                dept: "$dept",
                term: "$term",
                name: "$name",
                id: "$id",
                description: "$description",
                room: "$room",
                facultyname: "$people.name",
                email: "$people.email"
            }
        }
    ]
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

exports.handle_getcourseinfo = handle_getcourseinfo;