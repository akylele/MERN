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
    photo: {
        type: String,
    }
})

module.exports = model('User', schema)


// userId: profile ? profile.userId : '',
//     name: profile ? profile.name : '',
//     surname: profile ? profile.surname : '',
//     age: profile ? profile.age : '',
//     phone: profile ? profile.phone : '',
//     email: profile ? profile.email : '',
//     birthday: profile ? profile.birthday : ''