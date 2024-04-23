const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    profilename: {
        type: String,
        unique: [true, 'Profile name must be unique'],
        require: [true, 'Profile name nust be required']

    }
})

module.exports = mongoose.model('Profile', profile);
