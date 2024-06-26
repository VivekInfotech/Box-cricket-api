var mongoose = require('mongoose')
var Box = require('../models/Box-Owner/box.js')
var jwt = require('jsonwebtoken')

exports.addBox = async (req, res) => {
    try {
        var id = await jwt.verify(req.headers.auth, 'Owner')
        if (!id) {
            throw new Error("token must be provided")
        }
        req.body.ownerId = id

        req.body.images = req.files.map(file=>file.originalname)


        var addBoxData = await Box.create(req.body)

        res.status(200).json({
            status: 'Success',
            message: 'Box Create Successfully',
            data: addBoxData
        })


    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}


exports.updateBox = async (req, res) => {
    try {

        var decode = await jwt.verify(req.headers.auth, 'Owner')
        var id = req.params.id
        req.body.images = req.files.map(file=>file.originalname)


        if (!decode) {
            throw new Error("token must be provided")
        }
        req.body.ownerId = decode

        var updateBoxData = await Box.findByIdAndUpdate(id, req.body)

        res.status(200).json({
            status: 'Success',
            message: 'Box Update Successfully',
            data: updateBoxData
        })


    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}

exports.removeBox = async (req,res) => {
    try {
        
        var id = req.params.id

        var deleteBoxData = await Box.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Box Delete Successfully',
           
        })

    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
    }
}


exports.ownerBox = async(req, res) => {
    try {
        
        var decode = await jwt.verify(req.headers.auth, 'Owner')
        console.log(decode);

        var OwnerbyID = await Box.findOne({ ownerId : decode }).populate('ownerId', {password : 0 , _id : 0});

        res.status(200).json({
            status: 'Success',
            message: 'Box data get Successfully',
            data : OwnerbyID
           
        })

        

    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        })
        
    }
}