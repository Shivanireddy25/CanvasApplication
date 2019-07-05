var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Course = require('../../Backend/model/Courses');
var Announcements = require('../../Backend/model/Announcements');

function handle_request(message, callback){
    console.log('Create Announcements ', message);
       Course.findOne({
        CourseId : message.courseId
        }, function (err, course) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log('Announcements', course);
                var announcement  = {
                    name:message.name,
                    announcement:message.announcements,
                    courseId:message.courseId
                };
                course.announcements = course.announcements || [];
                course.announcements.push(announcement);
             

               
                course.save().then((doc) => {

                    console.log("Announcement saved successfully.", doc);

                }, (err) => {
                    console.log("Unable to add Announcements", err);
                    callback(err, null);
                }); 

               


            }
        });

        var new_announcement = new Announcements({
            name:message.name,
                    announcement:message.announcements,
                    courseId:message.courseId
           
        })
      

        new_announcement.save().then((doc) => {

            console.log(" Added successfully.", doc);
            callback(null, doc);

        }, (err) => {
            console.log("Unable to add Announcement.", err);
            callback(err, null);
        }); 

       
}

exports.handle_request = handle_request;

