var Admin = require('../models/Admin/admin.js')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var Box = require('../models/Box-Owner/box.js')
var Owner = require('../models/Box-Owner/owner.js')
exports.adminRegister = async (req, res) => {
    try {
        var { adminName ,email , password } = req.body
        
        password = await bcrypt.hash(password, 12)
        
        var AdminData = new Admin({
            adminName,
            email,
            password
        })
        await AdminData.save()
        res.status(200).json({
            status: 'Success',
            message: 'Admin create Successfully',
            data: AdminData
        })

    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.adminLogin = async (req, res) => {
    try {

        var token
        var { email, password } = req.body
        var AdminEmailCheck = await Admin.findOne({ email })

        if (!AdminEmailCheck) {
            throw new Error('Email not Found')
        }

        var passwordCheck = await bcrypt.compare(password, AdminEmailCheck.password)

        if (!passwordCheck) {
            throw new Error('Password does not match')
        }


        token = await jwt.sign(AdminEmailCheck.id, 'Admin')


        res.status(201).json({
            status: 'Success',
            message: 'Admin Login Successfully',
            token

        })


    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.adminUpdate = async (req, res) => {
    try {

        var id = req.params.id
        console.log(id);

        if (!id) {
            throw new Error('Include id in params')
        }

        // var { password } = req.body 
        // console.log(password);

        // req.body.password = await bcrypt.hash(password, 12)

        var AdminUpdate = await Admin.findByIdAndUpdate(id, req.body)

        res.status(200).json({
            status: 'Success',
            message: 'Admin Data Update Successfully',
            // data : OwnerUpdate
        })


    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.adminDelete = async(req,res)=>{
    try {
        
        var id = req.params.id

        if (!id) {
            throw new Error('Include id in params')
        }

        var adminDelete = await Admin.findByIdAndDelete(id)
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

exports.approveBox = async (req, res) => {
    try {
        var id = req.params.id

        if (!id) {
            throw new Error('Include id in params')
        }
        var AprroveBox = await Box.findByIdAndUpdate(id , {status : req.body.status})

        res.status(200).json({
            status: 'Success',
            message: 'status changed successfully',
            // data : OwnerUpdate
        })
    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.approveOwner = async (req, res) => {
    try {
        var owner_id = req.params.id

        if (!owner_id) {
            throw new Error('Include id in params')
        }

        var AprroveOwner = await Owner.findByIdAndUpdate(id , {status : req.body.status})

        res.status(200).json({
            status: 'Success',
            message: 'Status changed successfully',
            // data : OwnerUpdate
        })
    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.getOwners = async (req,res) => {
    try{

        var Ownerdata = await Owner.find()//projection //password not show

        res.status(200).json({
            status : true,
            data : Ownerdata
        })

    }
    catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.getOwnerBox = async (req,res) => {
    try{
        var owner_id = req.params.id

        var Boxdata = await Box.find({ownerId :owner_id},{_id : 0})//projection //password not show

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

exports.getAllBox = async (req,res) => {
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

