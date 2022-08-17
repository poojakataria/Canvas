var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_submitquiz(msg, callback) {

    console.log("In submitquiz.js -  handle_submitquiz :" + JSON.stringify(msg));
    let queryObj = {
        quizname: msg.quizzes[0].quizname,
        quizdate: msg.quizzes[0].quizdate
    }
    let quesArr = []
    let courseid = msg.quizzes[0].courseid
    msg.quizzes.forEach(function (quiz) {
        quesArr.push({
            question: quiz.question,
            option1: quiz.option1,
            option2: quiz.option2,
            option3: quiz.option3,
            option4: quiz.option4,
            answer: quiz.answer
        })
    })
    queryObj.questions = quesArr

    mongo.connect(mongoURL, function () {
        // console.log('Connected to mongo at: ' + mongoURL);
        let counterCollection = mongo.collection('quizcounter');
        counterCollection.findOneAndUpdate(
            { _id: "quizid" },
            { $inc: { seq: 1 } },
            { returnNewDocument: true }

            , function (err, result) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    //console.log("the counter in quiz", result.value.seq)
                    queryObj.quizid = result.value.seq
                    //console.log("query object in submitquiz", queryObj)
                    let myCollection = mongo.collection('coursedetail');
                    myCollection.updateOne({ id: courseid }, {
                        $push: {
                            quiz: queryObj
                        }
                    },
                        function (err, result) {
                            //console.log(result);
                            if (err) {
                                console.log("Update failed", err);

                            }
                            else {
                                console.log("Successful Update ");
                                callback(null, JSON.stringify({ 'quizid': queryObj.quizid }))
                            }
                        }
                    );
                }
            })
    });
}

exports.handle_submitquiz = handle_submitquiz;