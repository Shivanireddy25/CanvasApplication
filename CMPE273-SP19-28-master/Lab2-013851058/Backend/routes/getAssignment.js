var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');


router.get('/assignments/:id', requireAuth, function (req, res) {
    console.log(req.params.id);
    console.log('Inside Fetch Assignment GET!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("getAssignment", req.params.id, function(err, result){
            if(err){
                console.log("Error in fetching Assignment.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Assignment fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});


module.exports = router;
/*app.get('/assignments/:id', (req,res) => {
    console.log();
    console.log(req.params.id)
    var sql = util.format(
        'select * from assignments where id = %d;',
        req.params.id);
     
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
}) */