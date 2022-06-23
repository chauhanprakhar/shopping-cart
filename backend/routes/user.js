const express = require("express");
const mongoose = require('mongoose')
const User = mongoose.model("User")
const router = express.Router()

router.get('/get', async (req,res) => {
    const { number } = req.body
    const user = await User.find({ number })
    return res.status(200).send(user)
})

router.post('/register', async (req,res) => {
    const { address, pincode, number } = req.body;
    try {
        const user = await User.findOne({ number })
            .select('number')
            .lean()
            .exec();
        if (user) {
            return res.status(409).send({ message: 'user already exists' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
    try{
        const user = await User.create({ address, pincode, number })
        return res.status(201).send(user)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router