var mongoose = require('mongoose')
var Box = require('../models/Box-Owner/box.js')
var jwt = require('jsonwebtoken')

exports.addBox = async (req, res) => {
    try {
        var {boxName, images ,street ,city,state,pinCode,country, morningPrice , nightPrice } = req.body
        var id = await jwt.verify(req.headers.auth, 'Owner')
        if (!id) {
            throw new Error("token must be provided")
        }
        var ownerId = id

        var images = req.files ? req.files.map(file => file.originalname) : null;


        var addBoxData = new Box({
            ownerId,
            boxName,
            images,
            address : {
                street,
                city,
                state,
                pinCode,
                country
            },
            opning:{
                morning : {
                    morningPrice : morningPrice
                },
                night : {
                    nightPrice : nightPrice
                }
            }
        })

        await addBoxData.save()

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
        const { boxName, images, street, city, state, pinCode, country, morningPrice, nightPrice } = req.body;
        const token = req.headers.auth;
        
        if (!token) {
            throw new Error("Token must be provided");
        }

        const decoded = jwt.verify(token, 'Owner');
        if (!decoded) {
            throw new Error("Invalid token");
        }

        const id1 = req.params.id;

        const updateData = {
            boxName,
            images: req.files ? req.files.map(file => file.originalname) : images,
            address: {
                street,
                city,
                state,
                pinCode,
                country
            },
            opning: {
                morning: {
                    morningPrice
                },
                night: {
                    nightPrice
                }
            }
        };

        const updatedBox = await Box.findByIdAndUpdate(id1, updateData, { new: true });

        if (!updatedBox) {
            throw new Error("Box not found or you are not authorized to update this box");
        }

        res.status(200).json({
            status: 'Success',
            message: 'Box Updated Successfully',
            data: updatedBox
        });

    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        });
    }
};


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

        var OwnerbyID = await Box.find({ ownerId : decode }).populate('ownerId', {password : 0 , _id : 0});

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