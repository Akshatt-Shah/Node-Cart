// import { Router } from 'express'
const Router = require('express')

const { createcart, getcart, updatecart, deletecart } = require('../controllers/cartcontroller');
const verifyToken = require('../middleware/verifytoken');
const verifyProfileToken = require('../middleware/verifyprofiletoken');

const router = Router();

router.post('/createcart', verifyProfileToken, createcart)

router.get('/getcart', getcart)

router.put('/updatecart/:id', updatecart)

router.delete('/deletecart/:id', deletecart)

module.exports = router;