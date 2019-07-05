var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Course = require('../../Backend/model/Courses');
var Assignment = require('../../Backend/model/Assignment');
var Submission = require('../../Backend/model/Submissions');

function handle_request(message, callback){
    console.log('Create Submission', message);

    var submission = new Submission({
        Content: message.Content,
        AssignmentId :message.AssignmentId,
        Name : message.Name,
        User : message.name,
        CourseId: message.CourseId
})

submission.save().then((doc) => {

console.log(" Added successfully.", doc);
callback(null, doc);

}, (err) => {
console.log("Unable to add Submission", err);
callback(err, null);
}); 
Assignment.findOne({
        _id : message.AssignmentId
        }, function (err, course) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log('Submission', course);
               
                course.submissions = course.submissions || [];
                course.submissions.push(submission);

               
                course.save().then((doc) => {

                    console.log("Submission saved successfully.", doc);

                }, (err) => {
                    console.log("Unable to add Submission", err);
                    callback(err, null);
                }); 

               


            }
        });       
}

exports.handle_request = handle_request;