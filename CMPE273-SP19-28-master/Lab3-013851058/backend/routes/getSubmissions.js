var express = require('express');
var router = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.get('/submissions/:id', requireAuth, function (req, res) {

    console.log('Inside Fetch Assignments POST!');
    console.log('Request Body: ', req.params.id);
    

        kafka.make_request("getSubmissions", req.params, function(err, result){
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
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;


