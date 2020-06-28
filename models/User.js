const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    password:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true,
        unique: true
    }
})

module.exports = model('User', schema)