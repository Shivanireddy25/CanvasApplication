
var express = require('express');
var router = express.Router();


var passport = require('passport');


var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/createCourse', requireAuth, function (req, res) {

    console.log('Inside Create Course POST!');
    console.log('Request Body: ', req.body);

        kafka.make_request("createCourse", req.body, function(err, result){
            if(err){
                console.log("Error in creating Course.", err);
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
                res.end('Course Created');
            }
        });
    
});

module.exports = router;