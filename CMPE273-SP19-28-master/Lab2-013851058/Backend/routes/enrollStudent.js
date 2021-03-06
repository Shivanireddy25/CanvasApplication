var express = require('express');
var router = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.get('/people/enroll/:id/:name', requireAuth, function (req, res) {
    
    console.log('Inside Enroll Student POST!');
    console.log('Request Body: ', req.params);
    

        kafka.make_request("enrollStudent", req.params, function(err, result){
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