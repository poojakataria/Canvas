var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;
var bcrypt = require('bcrypt');

function handle_signup(msg, callback) {

    var res = {};
    console.log("In signup.js - handle_signup :" + JSON.stringify(msg));

    bcrypt.hash(msg.password, 10, function (err, hash) {
        if (err) {
            res.data = "Incorrect Information";
            callback(null, res);
        }
        else {
            mongo.connect(mongoURL, function () {
                //console.log('Connected to mongo at: ' + mongoURL);
                var myCollection = mongo.collection('userinfo');

                myCollection.findOne({ sjsuid: msg.sjsuId }, function (err, result) {
                    if (err) {
                        console.log("Error");
                        return console.log(result.toString());
                    } else {
                        console.log("results", result)
                        if (result) {
                            console.log('User exist: ', result);
                            callback(null, JSON.stringify('User exist'));
                        }
                        else {
                            myCollection.insert({
                                sjsuid: msg.sjsuId,
                                name: msg.name,
                                email: msg.email,
                                role: msg.role,
                                password: hash
                            },
                                function (err, result) {
                                    if (err) {
                                        return err;
                                        console.log(err)
                                    }

                                    else {
                                        res.data = JSON.stringify(result);
                                        console.log("Record successfully inserted");
                                        console.log("Stringified result in service", JSON.stringify(result))
                                        callback(null, JSON.stringify(result));
                                    }
                                });
                        }
                    }
                });
            });
        }
    })
}

exports.handle_signup = handle_signup;