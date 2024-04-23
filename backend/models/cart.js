const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    profileid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles"
    },
    products: {
        type: [
            {
                productid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                productname: {
                    type: String,
                    ref: "products"
                },
                qty: {
                    type: Number,
                    min: 1,
                    max: 100,
                    require: [true, "Qty Is Required In Between 1 to 100"]
                },
                price: {
                    type: Number,
                    require: [true, "Price Must Be Number And Valid"]
                }
            }
        ]
    }
})

module.exports = mongoose.model('Cart', cart);
