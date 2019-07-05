var express = require('express');
var router = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/waitListCourse', requireAuth, function (req, res) {
    
    console.log('Inside waitlist Course POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("waitListCourse", req.body, function(err, result){
            if(err){
                console.log("Error in Enrolling Course.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Course created successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Course Enrolled');
            }
        });
    
});

module.exports = router;