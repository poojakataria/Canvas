'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = "secret";
var mongo = require('./mongo');
const mongoURL = mongo.mongoURL;

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    //console.log("opts value", opts.jwtFromRequest)
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

        //console.log("jwt_payload", jwt_payload)
        mongo.connect(mongoURL, function () {
            var myCollection = mongo.collection('userinfo');

            myCollection.findOne({ sjsuid: jwt_payload.sjsuid }, function (err, results) {
                if (err) {
                    callback(err, false);
                } else {
                    var user = results;
                    delete user.password;
                    callback(null, user);
                }
            });
        });
    }));
};