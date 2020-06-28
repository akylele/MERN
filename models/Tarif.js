const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
Name:{type:String,required:true,unique:true},
Description:{type:String},
Price:{type:Number,required:true},
MBInternet:{type:Number},
MBMinutes:{type:Number},
MBSms:{type:Number},
HISpeed:{type:Number},
TChannels:{type:Number},
Likes:{type:Number}
})

module.exports = model('Tarif', schema)