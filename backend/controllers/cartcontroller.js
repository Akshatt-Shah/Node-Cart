const Cart = require('../models/cart')
const jwt = require('jsonwebtoken')
const createcart = async (req, res) => {
    try {
        const tokennn = req.headers.authorization;
        console.log(tokennn)
        const decodedToken = jwt.verify(tokennn, 'your-secret-key');
        const profileid = Object(decodedToken.profileid);
        console.log(profileid)
        const { products = [] } = req.body; // Assuming req.body contains pname and price


        console.log(profileid, products)
        const cart = await Cart.create({ profileid, products });
        if (cart) {

            console.log("Cart Added Successfully:", cart);
            res.send(cart);
        } else {
            res.status(500).send({ Error: "Error adding cart" });
        }
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).send({ Error: "Error adding cart" });
    }
};

const getcart = async (req, res) => {
    try {
        const tokennn = req.headers.authorization;
        const decodedToken = jwt.verify(tokennn, 'your-secret-key');
        const profileid = Object(decodedToken.profileid);
        const data = await Cart.find({ profileid: profileid });
        res.status(200)
        res.send(data)
    }
    catch {
        res.status(500).send({ Error: "Error While Fetching Cart The data" })

    }
}

const updatecart = async (req, res) => {
    try {
        const id = req.params.id;
        const { profileid, products = [] } = req.body; // Assuming req.body contains pname and price


        const cart = await Cart.findByIdAndUpdate(id, { profileid, products })
        console.log("Cart Updated Successfully:", cart);
        res.send(cart);
    }
    catch (err) {
        console.error("Error Updating Cart:", err);
        res.status(500).send({ Error: "Error Updating Cart" });
    }
}

const deletecart = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findByIdAndDelete(id)
        console.log("Cart deleted Successfully:", cart);
        res.send(cart);
    }
    catch (err) {
        console.error("Error Delting Cart:", err);
        res.status(500).send({ Error: "Error Delting Cart Details.................." });
    }
}


module.exports = { createcart, getcart, updatecart, deletecart }

