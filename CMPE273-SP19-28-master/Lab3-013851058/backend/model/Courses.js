var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
   CourseId:String,
   CourseName:String,
   CourseDept:String,
   CourseDescription : String,
   CourseRoom : String,
   CourseCapacity : String,
   WaitlistCapacity : String,
   courseTerm : String,
   createdBy : String, 
   CurrentStrength : String,
   Status : String,
   name : String,
   announcements : [],
   assignments : [],
   files : [{
      fname: "String",
      fpath: "String"
  }]
});
module.exports = mongoose.model('course', courseSchema);     