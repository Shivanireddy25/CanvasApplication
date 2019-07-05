var express = require('express');
var router = express.Router();


var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');

//Search
router.post('/searchPeople', requireAuth, function (req, res) {
 
    console.log('Inside People Search Method GET!');
    console.log('Request Body: ', req.body);

    kafka.make_request("searchPeople", req.body, function(err, result){
        if(err){
            console.log('Error');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Course Search');
        }
        else{
            
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            console.log(JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;