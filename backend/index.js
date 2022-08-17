
// import modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var multer = require('multer');
var kafka = require('./kafka/client');

// create express exp
var exp = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("In Multer Storage : changeDestination = ");
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var load = multer({ storage: storage });

var passport = require('passport');
require('./config/passport')(passport);
exp.use(passport.initialize());
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });
const secret = "secret";

exp.use(cors({ origin: 'http://localhost:3000', credentials: true }));


exp.use(bodyParser.urlencoded({ extended: true }));
exp.use(bodyParser.json());
exp.use(cookieParser());
exp.use(express.static('public'));

exp.use(session({
    saveUninitialized: false,
    secret: 'CMPE273_CANVAS',
    cookie: { maxAge: 60000 },
    resave: false
}));

exp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

exp.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
})

var UserProfile = require('./routes/UserProfile')
var login = require('./routes/login')
var newUser = require('./routes/newUser')
var UpdateProfile = require('./routes/UpdateProfile')
var UploadImage = require('./routes/UploadImage')
var AddCourse = require('./routes/AddCourse')
var getCourses = require('./routes/getCourses')
var SearchCourses = require('./routes/SearchCourses')
var Enroll = require('./routes/Enroll')
var EnrollWaitlist = require('./routes/EnrollWaitlist')
var Drop = require('./routes/Drop')
var getStudents = require('./routes/getStudents')
var getAnnouncement = require('./routes/getAnnouncement')
var makeAnnouncement = require('./routes/makeAnnouncement')
var getLectureFiles = require('./routes/getLectureFiles')
var UploadFile = require('./routes/UploadFile')
var loadAssignment = require('./routes/loadAssignment')
var getAssignment = require('./routes/getAssignment')
var UploadAssignment = require('./routes/UploadAssignment')
var viewAssignment = require('./routes/viewAssignment')
var getSubmissions = require('./routes/getSubmissions')
var postGrade = require('./routes/postGrade')
var getGrades = require('./routes/getGrades')
var getQuiz = require('./routes/getQuiz')
var SubmitQuiz = require('./routes/SubmitQuiz')
var getQuizDetail = require('./routes/getQuizDetail')
var SubmitQuizAnswers = require('./routes/SubmitQuizAnswers')
var givePermission = require('./routes/givePermission')
var getCourseInfo = require('./routes/getCourseInfo')
var sendMessage = require('./routes/sendMessage')
var getMessage = require('./routes/getMessage')
var updateOrder = require('./routes/updateOrder')

exp.use('/UserProfile', requireAuth, UserProfile);
exp.use('/login', login);
exp.use('/newUser', newUser);
exp.use('/UpdateProfile', requireAuth, UpdateProfile);
exp.use('/UploadImage', requireAuth, UploadImage);
exp.use('/AddCourse', requireAuth, AddCourse);
exp.use('/getCourses', requireAuth, getCourses);
exp.use('/SearchCourses', requireAuth, SearchCourses);
exp.use('/Enroll', requireAuth, Enroll);
exp.use('/EnrollWaitlist', requireAuth, EnrollWaitlist);
exp.use('/Drop', requireAuth, Drop);
exp.use('/getStudents', requireAuth, getStudents);
exp.use('/getAnnouncement', requireAuth, getAnnouncement);
exp.use('/makeAnnouncement', requireAuth, makeAnnouncement);
exp.use('/getLectureFiles', requireAuth, getLectureFiles);
exp.use('/UploadFile', requireAuth, UploadFile);
exp.use('/loadAssignment', requireAuth, loadAssignment);
exp.use('/getAssignment', requireAuth, getAssignment);
exp.use('/UploadAssignment', requireAuth, UploadAssignment);
exp.use('/viewAssignment', requireAuth, viewAssignment);
exp.use('/getSubmissions', requireAuth, getSubmissions);
exp.use('/postGrade', requireAuth, postGrade);
exp.use('/getGrades', requireAuth, getGrades);
exp.use('/getQuiz', requireAuth, getQuiz);
exp.use('/SubmitQuiz', requireAuth, SubmitQuiz);
exp.use('/getQuizDetail', requireAuth, getQuizDetail);
exp.use('/SubmitQuizAnswers', requireAuth, SubmitQuizAnswers);
exp.use('/givePermission', requireAuth, givePermission);
exp.use('/getCourseInfo', requireAuth, getCourseInfo);
exp.use('/sendMessage', requireAuth, sendMessage);
exp.use('/getMessage', requireAuth, getMessage);
exp.use('/updateOrder', requireAuth, updateOrder)

module.exports = exp;
exp.listen(8080);