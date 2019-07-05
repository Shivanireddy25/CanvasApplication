var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema({
   name:String,
   announcement:String,
   courseId:String
});
module.exports = mongoose.model('announcement', announcementSchema);    