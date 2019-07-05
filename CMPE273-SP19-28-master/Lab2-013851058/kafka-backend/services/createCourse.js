
var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Courses = require('../../Backend/model/Courses');

function handle_request(message, callback){
    console.log('Inside Kafka Method Create Course. Message ', message);
        User.findOne({
            name : message.name
        }, function (err, user) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log('User', user);
                var courses  = {
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
                    Status : "CREATED",
                    name : message.name
                };
               user.course = user.course || [];
               user.course.push(courses);

               
                user.save().then((doc) => {

                    console.log("Course saved successfully.", doc);


                }, (err) => {
                    console.log("Unable to add Course", err);
                    callback(err, null);
                }); 

               


            }
        });

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
            Status : "CREATED",
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