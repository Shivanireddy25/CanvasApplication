var express = require('express');
var router = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.get('/people/search', requireAuth, function (req, res) {
    
    console.log('Inside Paginate People POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("paginatePeople", req.query, function(err, result){
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
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;