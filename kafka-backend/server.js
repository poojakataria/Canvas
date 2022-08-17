var connection = new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var userprofile = require('./services/userprofile');
var updateprofile = require('./services/updateprofile');
var uploadimage = require('./services/uploadimage');
var addcourse = require('./services/addcourse');
var getcourses = require('./services/getcourses');
var searchcourses = require('./services/searchcourses');
var enroll = require('./services/enroll');
var enrollwaitlist = require('./services/enrollwaitlist');
var drop = require('./services/drop');
var getstudents = require('./services/getstudents');
var getannouncement = require('./services/getannouncement');
var makeannouncement = require('./services/makeannouncement');
var getlecturefiles = require('./services/getlecturefiles');
var uploadfile = require('./services/uploadfile');
var loadassignment = require('./services/loadassignment');
var getassignment = require('./services/getassignment');
var uploadassignment = require('./services/uploadassignment');
var viewassignment = require('./services/viewassignment');
var getsubmissions = require('./services/getsubmissions');
var postgrade = require('./services/postgrade');
var getgrade = require('./services/getgrade');
var getquiz = require('./services/getquiz');
var submitquiz = require('./services/submitquiz');
var submitquizanswers = require('./services/submitquizanswers');
var getquizdetail = require('./services/getquizdetail');
var givepermission = require('./services/givepermission');
var getcourseinfo = require('./services/getcourseinfo');
var sendmessage = require('./services/sendmessage');
var getmessage = require('./services/getmessage');
var updateorder = require('./services/updateorder');

var consumer = connection.getConsumer();
var producer = connection.getProducer();

consumer.on('message', function (message) {
    console.log('In server.js : Message Received for topic: ' + message.topic);

    var data = JSON.parse(message.value);

    console.log('reply topic : ' + data.replyTo);

    switch (message.topic) {
        case "login_request":
            console.log("In server.js - login_request case");
            login.handle_login(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "signup1_request":
            console.log("In server.js - signup1_request case");
            signup.handle_signup(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "userprofile_request":
            console.log("In server.js - userprofile_request case");
            userprofile.handle_userprofile(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "updateprofile_request":
            console.log("In server.js - updateprofile_request case");
            updateprofile.handle_updateprofile(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "uploadimage_request":
            console.log("In server.js - uploadimage_request case");
            uploadimage.handle_uploadimage(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "addcourse1_request":
            console.log("In server.js - addcourse1_request case");
            addcourse.handle_addcourse(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getcourses1_request":
            console.log("In server.js - getcourses1_request case");
            getcourses.handle_getcourses(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "searchcourses1_request":
            console.log("In server.js - searchcourses1_request case");
            searchcourses.handle_searchcourses(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "enroll1_request":
            console.log("In server.js - enroll_request case");
            enroll.handle_enroll(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "enrollwaitlist1_request":
            console.log("In server.js - enrollwaitlist_request case");
            enrollwaitlist.handle_enrollwaitlist(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "drop1_request":
            console.log("In server.js - drop1_request case");
            drop.handle_drop(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getstudents1_request":
            console.log("In server.js - getstudents1_request case");
            getstudents.handle_getstudents(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getannouncement1_request":
            console.log("In server.js - getannouncement1_request case");
            getannouncement.handle_getannouncement(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "makeannouncement1_request":
            console.log("In server.js - makeannouncement1_request case");
            makeannouncement.handle_makeannouncement(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getlecturefiles1_request":
            console.log("In server.js - getlecturefiles1_request case");
            getlecturefiles.handle_getlecturefiles(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "uploadfile1_request":
            console.log("In server.js - uploadfile1_request case");
            uploadfile.handle_uploadfile(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "loadassignment1_request":
            console.log("In server.js - loadassignment1_request case");
            loadassignment.handle_loadassignment(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getassignment1_request":
            console.log("In server.js - getassignment1_request case");
            getassignment.handle_getassignment(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "uploadassignment1_request":
            console.log("In server.js - uploadassignment1_request case");
            uploadassignment.handle_uploadassignment(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "viewassignment1_request":
            console.log("In server.js - viewassignment_request case");
            viewassignment.handle_viewassignment(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getsubmissions1_request":
            console.log("In server.js - getsubmissions_request case");
            getsubmissions.handle_getsubmissions(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "postgrade1_request":
            console.log("In server.js - postgrade1_request case");
            postgrade.handle_postgrade(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getgrade1_request":
            console.log("In server.js - getgrade_request case");
            getgrade.handle_getgrade(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "submitquiz1_request":
            console.log("In server.js - submitquiz1_request case");
            submitquiz.handle_submitquiz(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getquiz1_request":
            console.log("In server.js - getquiz1_request case");
            getquiz.handle_getquiz(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getquizdetail1_request":
            console.log("In server.js - getquizdetail1_request case");
            getquizdetail.handle_getquizdetail(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "submitquizanswers1_request":
            console.log("In server.js - submitquizanswers1_request case");
            submitquizanswers.handle_submitquizanswers(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "givepermission1_request":
            console.log("In server.js - givepermission1_request case");
            givepermission.handle_givepermission(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getcourseinfo1_request":
            console.log("In server.js - getcourseinfo1_request case");
            getcourseinfo.handle_getcourseinfo(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "sendmessage1_request":
            console.log("In server.js - sendmessage1_request case");
            sendmessage.handle_sendmessage(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "getmessage1_request":
            console.log("In server.js - getmessage1_request case");
            getmessage.handle_getmessage(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
        case "updateorder1_request":
            console.log("In server.js - updateorder1_request case");
            updateorder.handle_updateorder(data.data, function (err, res) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    if (err)
                        console.log(err);
                });
                return;
            });
            break;
    }
});