var mongooseTypes = require('mongoose').Types;

var quiz = require('../../Backend/model/Quiz');


function handle_request(message, callback){
    console.log('Create Quiz ', message);

    var new_quiz = new quiz({
        courseId : message.courseId, 
        qname : message.qname, 
         q1 : message.q1,
          op11 : message.op11, 
           op12 : message.op12,  
            op13  : message.op13, 
             op14  : message.op14, 
             cor1  : message.cor1, 
              q2 : message.q2, 
               op21 : message.op21, 
                op22 : message.op22, 
                 op23  : message.op23,  
                 op24 : message.op24, 
                  cor2 : message.cor2, 
                  d1 : message.d1,
                   d2 : message.d2
})


new_quiz.save().then((doc) => {

console.log(" Added Quiz successfully.", doc);
callback(null, doc);

}, (err) => {
console.log("Unable to add Quiz", err);
callback(err, null);
}); 
    
       
}

exports.handle_request = handle_request;



