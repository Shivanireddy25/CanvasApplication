var express = require('express');
var router = express.Router();

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/grades', requireAuth, function (req, res) {
    console.log(req.params.id);
    console.log('Inside Fetch Grades POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("getGrade", req.body, function(err, result){
            if(err){
                console.log("Error in fetching grades.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Grades fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;
