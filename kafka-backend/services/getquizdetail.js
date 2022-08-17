var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_getquizdetail(msg, callback) {

    console.log("In getquizdetail.js -  handle_getquizdetail :" + JSON.stringify(msg));
    let queryObj = [
        {
            $project: {
                quiz: 1
            }
        },
        {
            $unwind: "$quiz"
        },
        {
            $match: {
                "quiz.quizid": Number(msg.quizid)
            }
        },
        {
            $unwind: "$quiz.questions"
        },
        {
            $project: {
                quizid: "$quiz.quizid",
                quizname: "$quiz.quizname",
                question: "$quiz.questions.question",
                option1: "$quiz.questions.option1",
                option2: "$quiz.questions.option2",
                option3: "$quiz.questions.option3",
                option4: "$quiz.questions.option4",
            }
        }
    ]
    //console.log("query obj", queryObj)
    mongo.connect(mongoURL, function () {
        // console.log('Connected to mongo at: ' + mongoURL);
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

exports.handle_getquizdetail = handle_getquizdetail;