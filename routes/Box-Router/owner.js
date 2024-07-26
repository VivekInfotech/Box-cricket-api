var express = require('express');
// const { OwnerRegister, OwnerLogin, getOwnerDetails, OwnerUpdate, OwnerDelete } = require('../../controllers/owner');
// require('../../controllers/owner');
const Owner = require('../../controllers/owner')
const box = require('../../controllers/box')
var router = express.Router();
var multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '././public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


router.post('/owner' , Owner.OwnerRegister)
router.post('/ownerlogin' , Owner.OwnerLogin)
router.get('/ownerProfile',Owner.getOwnerDetails)
router.put('/owner/:id',Owner.OwnerUpdate)
router.delete('/owner/:id',Owner.OwnerDelete)
//Box router

router.post('/addbox' ,upload.array('images',10), box.addBox)
router.put('/updatebox/:id' ,upload.array('images',10), box.updateBox)
router.delete('/deletebox/:id' , box.removeBox)
  
router.get('/boxbyowner' , box.ownerBox)
  

module.exports = router;