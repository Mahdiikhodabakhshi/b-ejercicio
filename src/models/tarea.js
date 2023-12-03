const mongoose = require('mongoose');

const taskSchema =new  mongoose.Schema({
    name : {type:String , required:true},
    location : {type:String , required:true},
    hour : {type:String , required:true},
});


module.exports = mongoose.model('task' , taskSchema ,'tasks' );



