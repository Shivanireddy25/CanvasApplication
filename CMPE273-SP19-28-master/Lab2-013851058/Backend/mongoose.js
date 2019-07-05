var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://shivani:shivani@cluster0-50hvz.mongodb.net/test?retryWrites=truee', {useNewUrlParser : true, poolSize : 100} ,(err) =>{
    if (err) throw err;
    console.log("mongoose server running");
}); 

module.exports = {mongoose};