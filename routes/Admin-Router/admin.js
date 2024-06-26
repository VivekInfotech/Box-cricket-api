var express = require('express');

const Admin = require('../../controllers/admin')
var router = express.Router();


router.post('/admin' , Admin.adminRegister)
router.post('/adminlogin' , Admin.adminLogin)
router.put('/admin/:id' , Admin.adminUpdate)
router.delete('/admin/:id' , Admin.adminDelete)





module.exports = router;
