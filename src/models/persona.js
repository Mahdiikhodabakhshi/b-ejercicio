const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name : {type:String , required : true},
    email : {type:String , required : true},
    telephone : {type:Number , required : true},
    tarea :  {type : Array}
    

});


module.exports = mongoose.model('person',personSchema,'persons');