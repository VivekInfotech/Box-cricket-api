var mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true , "Street is required"]
    },
    area: {
        type: String,
        required: [true , "area is required"]
    },
    city: {
        type: String,
        required: [true , "city is required"]
    },
    state: {
        type: String,
        required: [true , "state is required"]
    },
    pinCode: {
        type: String,
        required: [true , "pinCode is required"]
    },
    country: {
        type: String,
        required: [true , "country is required"]
    }
}, { _id: false });

const Shift = new mongoose.Schema({
    morning: {
        eight_nine_am: { type: Boolean, default: true },
        nine_ten_am: { type: Boolean, default: true },
        ten_eleven_am: { type: Boolean, default: true },
        eleven_twelve_am: { type: Boolean, default: true },
        twelve_one_pm: { type: Boolean, default: true },
        one_two_pm: { type: Boolean, default: true },
        two_three_pm: { type: Boolean, default: true },
        three_four_pm: { type: Boolean, default: true },
        four_five_pm: { type: Boolean, default: true },
        five_six_pm: { type: Boolean, default: true },
        six_seven_pm: { type: Boolean, default: true },
        seven_eight_pm: { type: Boolean, default: true },
        morningPrice: { type: Number, required: true }
    },
    night: {
        eight_nine_pm: { type: Boolean, default: true },
        nine_ten_pm: { type: Boolean, default: true },
        ten_eleven_pm: { type: Boolean, default: true },
        eleven_twelve_pm: { type: Boolean, default: true },
        twelve_one_am: { type: Boolean, default: true },
        one_two_am: { type: Boolean, default: true },
        two_three_am: { type: Boolean, default: true },
        three_four_am: { type: Boolean, default: true },
        four_five_am: { type: Boolean, default: true },
        five_six_am: { type: Boolean, default: true },
        six_seven_am: { type: Boolean, default: true },
        seven_eight_am: { type: Boolean, default: true },
        nightPrice: { type: Number, required: true }
    }
}, { _id: false });



var boxSchema = new mongoose.Schema({

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
    },
    boxName: {
        type: String,
        required: [true , "boxName is required"]
    },
    images: [
        {
            type: String,
            required: [true , "images is required"]
        }
    ],
    contact : {
        type : Number,
        required : [true , "contact is required"]
    },
    address: addressSchema,
    opning: Shift,
    status: {
        type: String,
        enum: ['Pending', 'approved', 'block'],
        default: 'Pending'
    },

}, { timestamps: true })


module.exports = mongoose.model('Box', boxSchema)