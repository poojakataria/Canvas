var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

function handle_addcourse(msg, callback) {

    console.log("In addcourse.js - handle_addcourse :" + JSON.stringify(msg));
    let coursecapacity = Number(msg.coursecapacity)
    let waitlistcapacity = Number(msg.waitlistcapacity)
    mongo.connect(mongoURL, function () {
        //console.log('Connected to mongo at: ' + mongoURL);
        var myCollection = mongo.collection('coursedetail');

        myCollection.insert({
            id: msg.courseid,
            name: msg.coursename,
            dept: msg.coursedept,
            description: msg.coursedescription,
            room: msg.courseroom,
            capacity: coursecapacity,
            waitlist: waitlistcapacity,
            term: msg.courseterm,
            currEnrlNum: 0,
            currWLNum: 0,
            coursemapping:
                [{
                    sjsuid: msg.sjsuid,
                    role: msg.role,
                    status: null,
                    order: 100
                }]
        },
            function (err, result) {
                //console.log(result);
                if (err) {
                    console.log('Course not added in coursedetail');
                    callback(null, JSON.stringify(result))
                }
                else {
                    console.log(result);
                    callback(null, JSON.stringify(result))
                }
            }
        );
    });
}

exports.handle_addcourse = handle_addcourse;