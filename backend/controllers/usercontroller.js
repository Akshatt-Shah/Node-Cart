const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const profile = require('../models/profile');



const createuser = async (req, res) => {
    try {
        console.log("create User")
        let { name, password } = req.body; // Assuming req.body contains pname and price
        password = await bcrypt.hash(password, 10);

        const user = await User.create({ name, password });
        console.log("User Added Successfully:", user);
        res.send(user);
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).send({ Error: "Error adding User" });
    }
};

const getuser = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200)
        res.send(data)
    }
    catch {
        res.status(500).send({ Error: "Error While Fetching The data" })

    }
}

const updateuser = async (req, res) => {
    try {
        const id = req.params.id;
        let { name, password } = req.body;
        password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(id, { name, password })
        console.log("User Updated Successfully:", user);
        res.send(user);
    }
    catch {
        console.error("Error Updating User:", err);
        res.status(500).send({ Error: "Error Updating User" });
    }
}

const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id)
        console.log("User deleted Successfully:", user);
        res.send(user);
    }
    catch (err) {
        console.error("Error Delting user:", err);
        res.status(500).send({ Error: "Error Delting user" });
    }
}

// const loginuser = async (req, res) => {
//     try {

//         const { name, password } = req.body;

//         const data = await User.findOne({ name })

//         if (data) {
//             const isAuthentic = await bcrypt.compare(password, data.password)

//             if (isAuthentic) {
//                 const token = jwt.sign({ id: data._id, name: data.name, password: data.password }, 'your-secret-key', { expiresIn: '12h' });


//                 res.status(200).send({ token: token, Success: "Login Successfully" });
//             } else {
//                 res.status(500).send({ Error: "Login Failed Plz Provide correct Credential" })
//             }
//         } else {
//             console.log("No user found")
//             res.status(500).send({ Error: "No User Found Pleaze Provide Correct Credential" })
//         }

//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ Error: "Error While Fetching The data" })

//     }
// }



const loginuser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const data = await User.findOne({ name });

        if (data) {
            const isAuthentic = await bcrypt.compare(password, data.password);
            if (isAuthentic) {
                const token = jwt.sign({ id: data._id }, 'your-secret-key', { expiresIn: '12h' });



                res.status(200).send({ token: token, Success: "Login Successfully" });

            } else {
                res.status(401).send({ Error: "Incorrect password" });
            }
        } else {
            res.status(404).send({ Error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ Error: "Error while logging in" });
    }
};








module.exports = { createuser, getuser, updateuser, deleteuser, loginuser }

