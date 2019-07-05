var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({   
   Content:String,
   AssignmentId :String,
   Name : String,
   File : String,
   User : String,
   grades : Array,
   CourseId:String
});
module.exports = mongoose.model('submission', submissionSchema);