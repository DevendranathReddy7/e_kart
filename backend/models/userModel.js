const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema =new schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 }
})

module.exports = mongoose.model('User',userSchema)