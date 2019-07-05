var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Courses = require('../../Backend/model/Courses');

function handle_request(message, callback){
    console.log('Inside Kafka Method Waitlist Course. Message ', message);

    Courses.findOne({
        CourseId : message.CourseId
    }, function(err, c) {
        if (err) {
            console.log("Error", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error - Course');
        } else {
            console.log('Course', c);
            User.findOne({
                name : message.name
            }, function(err, user) {
                if (err) {
                    console.log("Error", err);
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error - Course');
                }  else {
                    user.course = user.course || [];
                    user.course.push(c);
                    user.save().then((doc) => {
                       console.log("Course Added to user");
                       callback(null, doc);
                    }, (err) => {
                        console.log("Unsuccessful");
                    });
                }
            })
        }
    })
   
      
               

        var new_course = new Courses({
            CourseId:message.CourseId,
            CourseName:message.CourseName,
            CourseDept:message.CourseDept,
          CourseDescription : message.CourseDescription,
CourseRoom : message.CourseRoom,
CourseCapacity : message.CourseCapacity,
WaitlistCapacity : message.WaitlistCapacity,
courseTerm : message.courseTerm,
createdBy : message.createdBy, 
CurrentStrength : message.CurrentStrength,
Status : "WAITLIST",
name : message.name
        })
      

        new_course.save().then((doc) => {

            console.log("Course added successfully.", doc);
            callback(null, doc);

        }, (err) => {
            console.log("Unable to add course.", err);
            callback(err, null);
        }); 

       
} 

exports.handle_request = handle_request;