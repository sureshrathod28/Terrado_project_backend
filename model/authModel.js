const mongoose=require('mongoose')

const userData= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
const userSchema=mongoose.model('terradoUser',userData)
module.exports={userSchema}