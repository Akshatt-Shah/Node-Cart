// import Product from '../models/product'
const session = require('express-session');
const Profile = require('../models/profile');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const createprofile = async (req, res) => {
    try {
        const { profilename } = req.body;
        let userid = Object(req.body.userid);
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'your-secret-key');
        userid = decodedToken.id
        console.log(userid);
        // Assuming req.body contains pname and price
        const data = await User.find({ "_id": userid })
            .catch(() => { res.send({ "Error": "User Id is not valid Please Provide Proper User id ............." }) });
        const profile = await Profile.create({ userid, profilename });
        console.log("Profile Added Successfully:", profile);
        res.send(profile);



    } catch (err) {
        console.log(err.message)
    }
};

const getprofile = async (req, res) => {
    // console.log(session.User)
    console.log("second")
    try {
        const token = req.headers.authorization;
        console.log("get profile token", token)
        const decodedToken = jwt.verify(token, 'your-secret-key');
        const id = decodedToken.id;
        console.log(id)

        // Find all profiles associated with the user ID
        const profiles = await Profile.find({ userid: id });
        console.log(profiles)
        // Get the count of profiles
        const profileCount = profiles.length;

        res.status(200).send({ count: profileCount, profiles: profiles });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Error while fetching the data" });
    }
};


const updateprofile = async (req, res) => {
    console.log("first")
    try {
        let id = req.params.id;
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'your-secret-key');
        const userid = decodedToken.id
        console.log(userid)
        console.log(id)


        const { profilename } = req.body;
        console.log(profilename)
        const data = await User.find({ "_id": userid })
            .catch(() => { res.send({ "Error": "User Id is not valid Please Provide Proper User id ............." }) });

        const profile = await Profile.findByIdAndUpdate(id, { userid, profilename })
        console.log("profile Updated Successfully:", { userid, profilename });
        res.send(profile);
    }
    catch (err) {
        console.error("Error Updating profile:", err);
        res.status(500).send({ Error: "Error Updating profile" });
    }
}

const deleteprofile = async (req, res) => {
    try {
        const id = req.params.id;
        const profile = await Profile.findByIdAndDelete(id)
        console.log("Profile deleted Successfully:", profile);
        res.send(profile);
    }
    catch (err) {
        console.error("Error Delting Profile:", err);
        res.status(500).send({ Error: "Error Delting Profile" });
    }
}
const addprofile = async (req, res) => {
    try {
        const id = req.params.id;
        const tokennn = jwt.sign({ profileid: id }, 'your-secret-key', { expiresIn: '12h' });

        // Set the token in the response header
        res.set('Authorization', `Bearer ${tokennn}`);
        res.status(200).send({ token: tokennn, Success: "Profile Seletcted Successfully" });
        console.log(tokennn)
    }
    catch (err) {
        console.error("Error Delting Profile:", err);
        res.status(500).send({ Error: "Error Delting Profile" });
    }
}


module.exports = { createprofile, getprofile, updateprofile, deleteprofile, addprofile }

