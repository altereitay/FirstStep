const mongoose = require('mongoose');

const StudentProfile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        }
    }],
    skills: {
        type: [String]
    },
    picture: {
        type: String
    },
    description: {
        type: String
    },
    availability: [{
        sunday:{
            type:Boolean ,
            default: false
        },
        monday:{
            type:Boolean,
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
            type:Boolean,
            default: false
        }
    }],
    isApproved: {
        type: Boolean,
        default: false
    },
    certificateOfStudying: {
        type: String
    },
    resume: {
        type: String
    }
})


//TODO: check how to add profile pics and certificate of studying
module.exports = Student = mongoose.model('student', StudentProfile);