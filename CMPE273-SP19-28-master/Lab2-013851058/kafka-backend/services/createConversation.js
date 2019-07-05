

var mongooseTypes = require('mongoose').Types;

var Message = require('../../Backend/model/Conversation');

function handle_request(message, callback){
    console.log('Create Conversation ', message);
 console.log("first time")


var mesg = new Message({
    FromUser: message.from,
    ToUser: message.to,
    sub: message.sub,
    msg: [{
        from: message.from,
        text: message.msg, 
    }]

   
})
mesg.save().then((doc) => {

console.log(" Added successfully.", doc);
callback(null, doc);

}, (err) => {
console.log("Unable to add Conversation", err);
callback(err, null);
}); 
}
exports.handle_request = handle_request;

