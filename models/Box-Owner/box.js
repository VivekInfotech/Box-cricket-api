// const { type } = require('express/lib/response')
var mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, { _id: false });

var Shift = mongoose.Schema({
    morning : [
        {
           eight_nine_am :{
               type : Boolean,
               default : true,
           },
           nine_ten_am : {
               type : Boolean,
               default : true
           },
           ten_eleven_am : {
               type : Boolean,
               default : true
           },
           eleven_twelve_am : {
               type : Boolean,
               default : true
           },
           twelve_one_am : {
               type : Boolean,
               default : true
           },
           one_two_am : {
               type : Boolean,
               default : true
           },
           two_three_am : {
               type : Boolean,
               default : true
           },
           three_four_am : {
               type : Boolean,
               default : true
           },
           four_five_am : {
               type : Boolean,
               default : true
           },
           five_six_am : {
               type : Boolean,
               default : true
           },
           six_seven_am : {
               type : Boolean,
               default : true
           },
           seven_eight_am : {
               type : Boolean,
               default : true
           },
           price : {
            type : Number,
            required : true
        }
       },
       { _id: false }
   ],
   night :[
       {
           eight_nine_pm :{
               type : Boolean,
               default : true,
           },
           nine_ten_pm : {
               type : Boolean,
               default : true
           },
           ten_eleven_pm : {
               type : Boolean,
               default : true
           },
           eleven_twelve_pm : {
               type : Boolean,
               default : true
           },
           twelve_one_pm : {
               type : Boolean,
               default : true
           },
           one_two_pm : {
               type : Boolean,
               default : true
           },
           two_three_pm : {
               type : Boolean,
               default : true
           },
           three_four_pm : {
               type : Boolean,
               default : true
           },
           four_five_pm : {
               type : Boolean,
               default : true
           },
           five_six_pm : {
               type : Boolean,
               default : true
           },
           six_seven_pm : {
               type : Boolean,
               default : true
           },
           seven_eight_pm : {
               type : Boolean,
               default : true
           },
           price : {
            type : Number,
            required : true
        }

       },
       { _id: false }
   ]
} , {_id : false})



var boxSchema = new mongoose.Schema({

    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner',
    },
    boxName: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            requires: true
        }
    ],
    address : [addressSchema],
    opning : [Shift],
     status: {
        type: String,
        enum: ['Pending', 'approved', 'block'],
        default: 'Pending'
    },

}, { timestamps: true })


module.exports = mongoose.model('Box' , boxSchema)