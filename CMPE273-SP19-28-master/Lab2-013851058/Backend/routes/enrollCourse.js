var express = require('express');
var router = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/enrollCourse', requireAuth, function (req, res) {
    
    console.log('Inside Enroll Course POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("enrollCourse", req.body, function(err, result){
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
                    'Content-type': 'text/plain'
                });
                res.end('Course Enrolled');
            }
        });
    
});

module.exports = router;



/*app.post('/enrollCourse', (req, res) => {
    
    //entering record to user table
    console.log("Course Creation");
    var status = "ENROLLED";
    var sql = "INSERT INTO courses (CourseId, CourseName , CourseDept, CourseDescription, CourseRoom, CourseCapacity , Waitlistcapacity, courseTerm, createdBy, status, name)  values";
    sql += util.format("(%d,'%s', '%s', '%s','%s', %d, %d, '%s', '%s', '%s','%s')", req.body.CourseId, req.body.CourseName, req.body.CourseDept, req.body.CourseDescription,
    req.body.CourseRoom, req.body.CourseCapacity, req.body.Waitlistcapacity, req.body.courseTerm, req.body.createdBy, status, req.body.name);
    console.log(sql);
       queryHelper.executeQuery(sql, function(result, err){
           if(err){
            
           } 
       }) 
       res.end("Course created");
}) */

