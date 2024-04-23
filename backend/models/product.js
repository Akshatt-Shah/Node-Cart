const mongoose = require('mongoose')

const product = new mongoose.Schema({
    pname: {
        type: String,
        unique: [true, 'Product name must be unique'],
        require: [true, 'Product name nust be required']
    },
    price: {
        type: Number,
        require: true,
        min: 0,
        max: 1000
    }
})

module.exports = mongoose.model('Product', product);
