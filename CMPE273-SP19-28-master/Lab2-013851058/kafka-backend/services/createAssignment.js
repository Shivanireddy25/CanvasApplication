var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Course = require('../../Backend/model/Courses');
var Assignment = require('../../Backend/model/Assignment');

function handle_request(message, callback){
    console.log('Create Assignment ', message);

    var new_assignment = new Assignment({
        Name:message.name,
       Content:message.Content,
       CourseId:message.CourseId,
       name : message.Name

})


new_assignment.save().then((doc) => {

console.log(" Added successfully.", doc);
callback(null, doc);

}, (err) => {
console.log("Unable to add Assignments", err);
callback(err, null);
}); 
       Course.findOne({
        CourseId : message.CourseId
        }, function (err, course) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log('Course', course);
                
                course.assignments = course.assignments || [];
                course.assignments.push(new_assignment);
             

               
                course.save().then((doc) => {

                    console.log("Assignment saved successfully.", doc);

                }, (err) => {
                    console.log("Unable to add Assignments", err);
                    callback(err, null);
                }); 

               


            }
        });

       

       
}

exports.handle_request = handle_request;

