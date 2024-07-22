var User = require('../models/user/user')
var bcrypt = require('bcrypt')
var Box = require('../models/Box-Owner/box')
exports.userRegister = async (req, res) => {
    try {
        var { userName ,email , password } = req.body
        password = await bcrypt.hash(password, 12)
        
        var UserData = new User({
            userName,
            password,
            email
        })
        await UserData.save()

        res.status(200).json({
            status: 'Success',
            message: 'User registered Successfully',
            data: UserData
        })

    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.userLogin = async (req, res) => {
    try {

        var token
        var { email, password } = req.body
        var UserEmailCheck = await User.findOne({ email })

        if (!UserEmailCheck) {
            throw new Error('Email not Found')
        }

        var passwordCheck = await bcrypt.compare(password, UserEmailCheck.password)

        if (!passwordCheck) {
            throw new Error('Password does not match')
        }


        token = await jwt.sign(UserEmailCheck.id, 'User')


        res.status(201).json({
            status: 'Success',
            message: 'User Login Successfully',
            token

        })


    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.userUpdate = async (req, res) => {
    try {
        var id = req.params.id
        console.log(id);

        if (!id) {
            throw new Error('Include id in params')
        }

        var UserUpdate = await User.findByIdAndUpdate(id, req.body)

        res.status(200).json({
            status: 'Success',
            message: 'User Data Update Successfully',
            // data : OwnerUpdate
        })
    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.userDelete = async(req,res)=>{
    try {
        
        var id = req.params.id

        if (!id) {
            throw new Error('Include id in params')
        }

        var userDelete = await User.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Admin Data Delete Successfully',
            // data : OwnerUpdate
        })


    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.viewAllBox = async (req,res) => {
    try{
        var Boxdata = await Box.find()//projection //password not show

        res.status(200).json({
            status : true,
            data : Boxdata
        })

    }
    catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.getOneBox = async (req,res) => {
try{

    var box_id =  req.params.id
    var Boxdata = await Box.findById(box_id)

    res.status(200).json({
        status : true,
        data : Boxdata
    })
}
catch (error) {
    res.status(401).json({
        status: 'Failed',
        message: error.message
    })
}
}
exports.getshift = async (req, res) => {
    try {
        const box_id = req.params.id;
        const current_time = new Date();
        const current_hour = current_time.getHours();
        const current_period = current_hour >= 8 && current_hour < 20 ? 'morning' : 'night';

        const box = await Box.findById(box_id);

        if (!box) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Box not found'
            });
        }

        // Define the shift keys
        const morningShifts = [
            'eight_nine_am', 'nine_ten_am', 'ten_eleven_am', 'eleven_twelve_am', 
            'twelve_one_pm', 'one_two_pm', 'two_three_pm', 'three_four_pm',
            'four_five_pm', 'five_six_pm', 'six_seven_pm', 'seven_eight_pm'
        ];

        const nightShifts = [
            'eight_nine_pm', 'nine_ten_pm', 'ten_eleven_pm', 'eleven_twelve_pm', 
            'twelve_one_am', 'one_two_am', 'two_three_am', 'three_four_am',
            'four_five_am', 'five_six_am', 'six_seven_am', 'seven_eight_am'
        ];

        // Update the shift status
        if (current_period === 'morning') {
            for (let i = 8; i < 20; i++) {
                const shiftKey = morningShifts[i - 8];
                if (current_hour >= i) {
                    box.opning.morning[shiftKey] = false;
                }
            }
        } else {
            for (let i = 20; i < 24; i++) {
                const shiftKey = nightShifts[i - 20];
                if (current_hour >= i) {
                    box.opning.night[shiftKey] = false;
                }
            }
            for (let i = 0; i < 8; i++) {
                const shiftKey = nightShifts[12 + i];
                if (current_hour >= i || current_hour < 8) {
                    box.opning.night[shiftKey] = false;
                }
            }
        }

        await box.save();

        res.status(200).json({
            status: true,
            data: box
        });
    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        });
    }
};



