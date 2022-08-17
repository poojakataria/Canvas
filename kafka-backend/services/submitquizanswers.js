var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_submitquizanswers(msg, callback) {

    console.log("In submitquizanswers.js -  handle_submitquizanswers :" + JSON.stringify(msg));
    let queryObj = {
        sjsuid: msg.answers[0].sjsuid
    }
    let ansArr = []
    let courseid = msg.answers[0].courseid
    let quizid = msg.answers[0].quizid
    msg.answers.forEach(function (answer) {
        ansArr.push({
            question: answer.question,
            answer: answer.answer
        })
    })
    queryObj.answers = ansArr

    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        let myCollection = mongo.collection('coursedetail');
        myCollection.updateOne(
            {
                id: courseid,
                "quiz.quizid": Number(quizid)
            },
            {
                $push: {
                    "quiz.$.quizsubmission": queryObj
                }
            },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log("Update failed", err);

                }
                else {
                    console.log("Successful Update ");
                    callback(null, JSON.stringify({ "result": "Successful Update" }));
                }
            }
        );
    });
}

exports.handle_submitquizanswers = handle_submitquizanswers;