const mongoose = require('mongoose')

const DB = require('./defualt.json').mongoURL

const connectDB = async () => {
    try{
        await mongoose.connect(DB, {
            useNewUrlParser:true
        });
        console.log('connected to mongo');
        mongoose.connection.useDb('FirstStepDB')
    }catch (e) {
        console.error(e.message)
        //Exit process on fail
        process.exit(1)
    }
}

module.exports = connectDB;