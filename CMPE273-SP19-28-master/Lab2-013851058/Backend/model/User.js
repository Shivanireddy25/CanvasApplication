var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   name:String,
   email:String,
   password:String,
   userType : String,
   phoneNumber : Number,
   about : String,
   city : String,
   country : String,
   company : String, 
   school : String,
   hometown : String,
   languages : String,
   gender : String ,
   course :  Array,
   messages : Array,
   grades : Array
});
module.exports = mongoose.model('user', userSchema);     