var mongoose = require('mongoose')

var bookInfo = new mongoose.Schema({
    boxid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'box'
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    time:{
        type:String
    }
})

module.exports = mongoose.model('Book', bookInfo)