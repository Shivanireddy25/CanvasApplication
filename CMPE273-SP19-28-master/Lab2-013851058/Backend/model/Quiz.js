var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    courseId : String, 
    qname : String, 
     q1 : String,
      op11 : String, 
       op12 : String,  
        op13  : String, 
         op14  : String, 
         cor1  : String, 
          q2 : String, 
           op21 : String, 
            op22 : String, 
             op23  : String,  
             op24 : String, 
              cor2 : String, 
              d1 : String,
               d2 : String
});
module.exports = mongoose.model('quiz', QuizSchema);