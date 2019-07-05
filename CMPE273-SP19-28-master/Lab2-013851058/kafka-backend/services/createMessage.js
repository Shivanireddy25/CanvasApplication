var mongooseTypes = require('mongoose').Types;


var Message = require('../../Backend/model/Conversation');

function handle_request(message, callback){
    console.log('Create Message', message);
    console.log(message);
    const msgs = {
        from: message.from,
        text: message.text,
        
    }

    Message.findOne({ 
        $or: [{ $and: [{ "FromUser": message.from }, { "ToUser": message.to }, { "sub": message.sub }] },
         { $and: [{ "FromUser": message.to }, { "ToUser": message.from }, { "sub": message.sub }] }] }, 
         function (err, mesg) {
            if (err) {
                console.log("Error", err);
                
            }
            else {
                mesg.msg = mesg.msg || [];
                mesg.msg.push(msgs);  
                mesg.save().then((doc) => {

                    console.log("Message details Updated successfully.", doc);
                    callback(null, doc);
        
                }, (err) => {
                    console.log("Unable to save Message details.", err);
                    callback(err, null);
                });
                callback(null,mesg);

            }
        }); 
       
    
}

exports.handle_request = handle_request;




