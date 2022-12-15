const mongoose = require('mongoose');

const EmployerProfile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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
    picture: {
        type: String
    },
    description: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    requiredDays: [{
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
    }]
})


//TODO: check how to add profile pics
module.exports = Employer = mongoose.model('employer', EmployerProfile);