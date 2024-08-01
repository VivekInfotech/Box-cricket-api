var mongoose = require('mongoose')
var Box = require('../models/Box-Owner/box.js')
var jwt = require('jsonwebtoken')
var Owner = require('../models/Box-Owner/owner.js')
const cloudinary = require('../routes/Box-Router/cloudinary.js')
exports.addBox = async (req, res) => {
    try {
        var { boxName, street, city, state, area, pinCode, country, morningPrice, nightPrice, contact } = req.body;

        if (!boxName || !street || !city || !state || !area || !pinCode || !country || !morningPrice || !nightPrice || !contact) {
            throw new Error('All fields are required');
        }

        var id = await jwt.verify(req.headers.auth, 'Owner');
        if (!id) {
            throw new Error("Token must be provided");
        }

        var checkStatus = await Owner.findById(id);
        let status = checkStatus.status;

        if (status !== "approved") {
            throw new Error(`You are not able to add a box because your status is ${status}`);
        }

        var images = req.files ? await Promise.all(req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, { folder: 'box_images' });
            return result.secure_url;
        })) : [];

        var addBoxData = new Box({
            ownerId: id,
            boxName,
            images,
            contact,
            address: {
                street,
                area,
                city,
                state,
                pinCode,
                country
            },
            opening: {
                morning: {
                    morningPrice
                },
                night: {
                    nightPrice
                }
            }
        });

        await addBoxData.save();

        res.status(200).json({
            status: 'Success',
            message: 'Box created successfully',
            data: addBoxData
        });

    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: error.message
        });
    }
};




exports.updateBox = async (req, res) => {
    try {
        const { boxName, street, city, state, area, pinCode, country, morningPrice, nightPrice } = req.body;
        const token = req.headers.auth;

        if (!token) {
            throw new Error("Token must be provided");
        }

        const decoded = jwt.verify(token, 'Owner');
        if (!decoded) {
            throw new Error("Invalid token");
        }

        const id1 = req.params.id;

        const images = req.files ? await Promise.all(req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, { folder: 'box_images' });
            return result.secure_url;
        })) : req.body.images;

        const updateData = {
            boxName,
            images,
            address: {
                street,
                area,
                city,
                state,
                pinCode,
                country
            },
            opening: {
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
            message: 'Box updated successfully',
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