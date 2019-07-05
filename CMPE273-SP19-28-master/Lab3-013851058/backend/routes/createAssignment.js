var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');

router.post('/createAssignments', requireAuth, function (req, res) {

    console.log('Inside Create Assignments POST!');
    console.log('Request Body: ', req.body);
   
    console.log(req.session.user);

        kafka.make_request("createAssignment", req.body, function(err, result){
            if(err){
                console.log("Error ", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Success", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Assignments created');
            }
        });
    
});

module.exports = router;



