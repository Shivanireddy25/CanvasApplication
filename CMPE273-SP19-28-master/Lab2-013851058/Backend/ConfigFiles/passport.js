'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var mongoose = require('../mongoose');
var user = require('../model/User');
const secret = "secret";


module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

        user.findOne({ 
            'name': jwt_payload.name 
        }, (err, res) => {

                if (res) {
                    var user = res;
                   delete user.password;
                 callback(null, user);
                }
                else {
                    callback(err, false);
                }
            });
    }));
};