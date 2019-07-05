var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');


router.get('/getCourse/:id', requireAuth, function (req, res) {
    console.log(req.params.id);
    console.log('Inside Fetch the Course POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("getCourse", req.params.id, function(err, result){
            if(err){
                console.log("Error in fetching Course.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Course fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});




module.exports = router;