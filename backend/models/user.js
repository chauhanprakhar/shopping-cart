const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        address: {
            type: String
        },
        pincode: {
            type: String
        },
        number: {
            type: String,
            required: true
        }
    },
);

mongoose.model('User', userSchema);