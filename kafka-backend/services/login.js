var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;
var bcrypt = require('bcrypt');

function handle_login(msg, callback) {
    var res = [];
    console.log("In handle_login.js -  handle_login :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('userinfo');

        myCollection.findOne({ sjsuid: msg.userName, role: msg.role },
            function (err, result) {
                console.log(result);
                if (err) { console.log("Server error") };
                if (result) {
                    bcrypt.compare(msg.password, result.password, function (err, response) {
                        if (response) {
                            console.log('User exist: ', result.role);
                            res.push(result)
                            //callback(null, JSON.stringify(res))
                            callback(null, result)
                        }
                        else {
                            console.log("password not matched");
                            callback(null, "Incorrect")
                        }
                    });
                }
                else {
                    console.log('User', msg.userName, ' do not exist');
                    callback(null, "Incorrect")
                }
            }
        );
    });

}

exports.handle_login = handle_login;