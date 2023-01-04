const mongoose = require('mongoose');

const JobOffer = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employer',
        required: true
    },
    jobTitle: {
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
    requiredDays: {
        sunday:{
            type:Boolean ,
            default: false
        },
        monday:{
            type:Boolean ,
            default: false
        },
        tuesday:{
            type:Boolean ,
            default: false
        },
        wednesday:{
            type:Boolean ,
            default: false
        },
        thursday:{
            type:Boolean ,
            default: false
        },
        friday:{
            type:Boolean ,
            default: false
        },
        saturday:{
            type:Boolean ,
            default: false
        }
    },
    appliedStudents:{
        type:[String]
    },
    picture:{
        type:String
    }
})


//TODO: check how to add profile pics
module.exports = Job = mongoose.model('jobs', JobOffer);