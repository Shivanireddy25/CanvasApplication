var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
   ID : String,
   Content:String,
   CourseId:String,
   Name : String,
   dueDate : String,
   submissions : Array,
   name : String
});
module.exports = mongoose.model('assignment', assignmentSchema);