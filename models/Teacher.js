const mongoose = require("mongoose")

const TeacherScheama = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true, // Ensures email is unique in the database
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email format validation
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    }
})

const TeacherModel = mongoose.model("Teachers",TeacherScheama)
module.exports = TeacherModel