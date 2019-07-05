var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');


router.get('/messages/:id/:sub', requireAuth, function (req, res) {

    console.log('Inside get Message !');
   
    console.log('Request Body: ', req.params);
    

        kafka.make_request("getMessage", req.params, function(err, result){
            if(err){
                console.log("Error in fetching Message.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Messages fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;