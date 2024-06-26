var mongoose = require('mongoose')

var ownerSchema = new mongoose.Schema({
    ownerName : {
        type : String,
        required : true
    },
    email : {
        type : String,  
        required : true,
        unique  : true
    },
    password : {
        type : String,
        required : true,
        // max : [20 , "Password lenght is to long"]
    }
})


module.exports = mongoose.model('Owner' , ownerSchema)
