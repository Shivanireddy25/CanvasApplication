var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Grade = require('../../Backend/model/Grade');
var Submission = require('../../Backend/model/Submissions');

function handle_request(message, callback){
    console.log('Create Grade', message);

    var grade = new Grade({
   SubmissionId : message.SubmissionId,
   name : message.name,
   Score : message.Score,
   Outof : message.Outof,
   CourseId : message.CourseId
       
})

grade.save().then((doc) => {

console.log(" Added Grade successfully.", doc);
callback(null, doc);

}, (err) => {
console.log("Unable to add Grade", err);
callback(err, null);
}); 


        User.findOne({
            name : message.name
            }, function (err, course) {
                if (err) {
                    console.log("Error", err);
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error - Course');
                }
                else {
                    console.log('User with grade', course);
                    /*var assignment  = {
                        Content:message.Content,
                        CourseId:message.CourseId,
                        Name : message.name,
                        dueDate : String
                    }; */
                    course.grades = course.grades || [];
                    course.grades.push(grade);
    
                   
                    course.save().then((doc) => {
    
                        console.log("Grade added successfully.", doc);
    
                    }, (err) => {
                        console.log("Unable to add Grade", err);
                        callback(err, null);
                    }); 
                   
                }
            });       
}

exports.handle_request = handle_request;