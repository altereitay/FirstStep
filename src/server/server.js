const server = require('./app');
const PORT = 5000;
const connectDB = require('./configs/db')
connectDB();



server.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`);
})

module.exports = server