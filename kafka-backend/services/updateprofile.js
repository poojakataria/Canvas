var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_updateprofile(msg, callback) {

    console.log("In updateprofile.js - handle_updateprofile :" + JSON.stringify(msg));
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('userinfo');

        myCollection.updateOne({ sjsuid: msg.sjsuid }, {
            $set: {
                name: msg.name, email: msg.email,
                phone: msg.phone, aboutme: msg.aboutme, city: msg.city,
                country: msg.country, company: msg.company, school: msg.school,
                hometown: msg.hometown, languages: msg.languages, gender: msg.gender
            }
        },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log("Update failed");
                }
                else {
                    console.log("Successful Update ");
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_updateprofile = handle_updateprofile;