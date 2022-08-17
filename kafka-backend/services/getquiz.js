var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getquiz(msg, callback) {

    console.log("In getquiz.js -  handle_getquiz :" + JSON.stringify(msg));
    let queryObj = [
        {
            $match: {
                id: msg.courseid
            }
        },
        {
            $project: {
                quiz: 1
            }
        },
        {
            $unwind: "$quiz"
        },
        {
            $addFields: {
                tempsjsuid: {
                    $cond: { if: { $isArray: "$quiz.quizsubmission" }, then: "$quiz.quizsubmission.sjsuid", else: ["0"] }
                }
            }
        },
        {
            $addFields: {
                hassjsuid: {
                    $in: [msg.sjsuid, "$tempsjsuid"]
                }
            }
        },
        {
            $project: {
                quizid: "$quiz.quizid",
                quizname: "$quiz.quizname",
                quizdate: "$quiz.quizdate",
                sjsuid: {
                    $cond: { if: { $eq: ["$hassjsuid", true] }, then: msg.sjsuid, else: 0 }
                }
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

exports.handle_getquiz = handle_getquiz;