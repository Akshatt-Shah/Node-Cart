// import { Router } from 'express'
const Router = require('express')
const verifyToken = require('../middleware/verifytoken');
// import { createproduct } from '../controllers/productcontroller'
const { createuser, getuser, updateuser, deleteuser, loginuser } = require('../controllers/usercontroller')

const router = Router();

router.post('/createuser', createuser)

router.get('/getuser', getuser)

router.put('/updateuser/:id', updateuser)

router.delete('/deleteuser/:id', deleteuser)

router.post('/loginuser', loginuser)

module.exports = router;