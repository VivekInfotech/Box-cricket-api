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

exports.getshift = async (req,res) => {
    try{
    var box_id =  req.params.id
    var Boxdata = await Box.findById(box_id,{})

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
