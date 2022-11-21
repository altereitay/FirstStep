const mongoose = require('mongoose');

const StudentProfile = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'user',
        required: true
    },
    name:{
        type: String
    },
    dateOfBirth:{},
    city:{}
})