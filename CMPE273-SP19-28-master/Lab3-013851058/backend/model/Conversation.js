var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConvoSchema = new Schema({
    FromUser: String,
    ToUser: String,
    sub: String,
    msg : Array
    /*msg: [{
        from: String,
        text: String, 
    }] */

});
module.exports = mongoose.model('Conversation', ConvoSchema);