// import { Router } from 'express'
const Router = require('express')
// import { createproduct } from '../controllers/productcontroller'
const { createproduct, getproduct, updateproduct, deleteproduct } = require('../controllers/productcontroller');
const verifyToken = require('../middleware/verifytoken');

const router = Router();

router.post('/createproduct', createproduct)

router.get('/getproduct', getproduct)

router.put('/updateproduct/:id', updateproduct)

router.delete('/deleteproduct/:id', deleteproduct)

module.exports = router;