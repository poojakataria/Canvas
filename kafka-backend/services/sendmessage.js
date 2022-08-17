var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;


function handle_sendmessage(msg, callback) {

    console.log("In sendmessage.js - sendmessage :" + JSON.stringify(msg));
    let currDate = new Date()

    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('messages');

        myCollection.insertOne({
            from: msg.from,
            to: msg.to,
            subject: msg.subject,
            message: msg.message,
            createdat: currDate.toLocaleDateString('en-US')
        },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log('Message not added');
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log('Message added');
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_sendmessage = handle_sendmessage;