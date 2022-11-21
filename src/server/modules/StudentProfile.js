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
    picture: {},
    description: {
        type: String
    },
    availability: [{
        day: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        }
    }],
    isApproved:{
        type: Boolean,
        default: false
    },
    certificateOfStudying:{

    }
})


//TODO: check how to add profile pics and certificate of studying
module.exports = Student = mongoose.model('student', StudentProfile);