const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    birthday: {
        type: String,
    },
    createdAt: {
        required: true,
        type: Date,
    }
})

module.exports = model('User', schema)
