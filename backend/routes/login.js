var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });
const secret = "secret";
var exp = express();


router.post('/', function (req, res) {

    var payload = {
        "userName": req.body.username,
        "password": req.body.password,
        "role": req.body.loginAs
    }
    kafka.make_request('login_request', 'login_response', payload, function (err, results) {
        console.log("In index.js - login : Results - " + results);
        if (err) {
            res.end("Incorrect")
        }
        else {
            if (results != 'Incorrect') {
                var token = jwt.sign(results, secret, {
                    expiresIn: '2h'
                });

                console.log("token", token)
                res.cookie('role', payload.role, { maxAge: 900000, httpOnly: false, path: '/' });
                res.cookie('sjsuid', payload.userName, { maxAge: 900000, httpOnly: false, path: '/' });
                var result = {
                    sjsuid: payload.userName,
                    role: payload.role,
                    token: token
                }
                res.send(JSON.stringify(result));
            }
            else {
                //console.log("inside false")
                res.end("Incorrect")
            }
        }
    });
});

module.exports = router;