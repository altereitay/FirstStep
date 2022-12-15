const mongoose = require('mongoose');

const JobOffer = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employer',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    percentageOfJob:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    requiredSkills:{
        type: [String],
        required:true
    },
    jobType:{
        type: [String],
        required:true
    },
    appliedStudents:{
        type:[mongoose.Schema.Types.ObjectId]
    },
    picture:{
        type:String
    }
})


//TODO: check how to add profile pics
module.exports = Job = mongoose.model('jobs', JobOffer);