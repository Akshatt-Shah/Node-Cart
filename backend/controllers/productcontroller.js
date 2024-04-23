// import Product from '../models/product'
const Product = require('../models/product')

const createproduct = async (req, res) => {
    try {
        const { pname, price } = req.body; // Assuming req.body contains pname and price
        const product = await Product.create({ pname, price });
        console.log("Product Added Successfully:", product);
        res.send(product);
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).send({ Error: "Error adding product" });
    }
};

const getproduct = async (req, res) => {
    try {
        const data = await Product.find();
        res.status(200)
        res.send(data)
    }
    catch {
        res.status(500).send({ Error: "Error While Fetching The data" })

    }
}

const updateproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { pname, price } = req.body;
        const product = await Product.findByIdAndUpdate(id, { pname, price })
        console.log("Product Updated Successfully:", { pname, price });
        res.send({ pname, price });
    }
    catch (err) {
        console.error("Error Updating product:", err);
        res.status(500).send({ Error: "Error Updating product" });
    }
}

const deleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id)
        console.log("Product deleted Successfully:", product);
        res.send(product);
    }
    catch (err) {
        console.error("Error Delting product:", err);
        res.status(500).send({ Error: "Error Delting product" });
    }
}


module.exports = { createproduct, getproduct, updateproduct, deleteproduct }

