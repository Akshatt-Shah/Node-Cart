const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Username must be unique'],
        require: [true, 'Username nust be required']
    },
    password: {
        type: String,
        require: [true, 'Password  must be required']
    }
})

module.exports = mongoose.model('User', user);