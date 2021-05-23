const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    workingDays:{type:Object},
    offDays:{type:Object}
})

module.exports = mongoose.model('User', userSchema);
