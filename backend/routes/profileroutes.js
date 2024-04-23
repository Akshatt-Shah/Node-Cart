// import { Router } from 'express'
const Router = require('express')
// import { createproduct } from '../controllers/productcontroller'
const { createprofile, getprofile, updateprofile, deleteprofile, addprofile } = require('../controllers/profilecontroller');
const verifyToken = require('../middleware/verifytoken');

const router = Router();

router.post('/createprofile', verifyToken, createprofile)

router.get('/getprofile', verifyToken, getprofile)

router.put('/updateprofile/:id', verifyToken, updateprofile)

router.delete('/deleteprofile/:id', deleteprofile)

router.post('/addprofile/:id', addprofile)

module.exports = router;