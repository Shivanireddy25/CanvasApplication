var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gradeSchema = new Schema({
   grade:String,
   SubmissionId :String,
   name : String,
   Score : String,
   Outof : String,
   CourseId:String
});
module.exports = mongoose.model('grade', gradeSchema);