
var express = require('express');
var router = express.Router();


var kafka = require('../kafka/client');


//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
const secret = "secret";

router.post('/signIn',  function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ', req.body);

    //Kafka request 

    kafka.make_request('loginPage', req.body, function(err, result){
        console.log('In results login');
        console.log('results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Login Error!');
        }
        else{
            console.log('Inside results Login');
            if(result){
                req.session.user = result;

                
                var token = jwt.sign(result, secret, {
                    expiresIn: 10080 // in seconds
                });

                
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                
                
                var Result = {
                    name : result.name,
                    userType : result.userType,
                    Token : token
                }

                res.end(JSON.stringify(Result));    
            }
            else{
                res.writeHead(200,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid Credentials!');
                res.end('Invalid Credentials!');
            }            
        }
    });

    //Query    
});

module.exports = router;