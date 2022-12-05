const express = require('express');
const app = express();
const PORT = 5000;
const connectDB = require('./configs/db')
app.use(express.json());
connectDB();

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profiles', require('./routes/profiles'))



app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`);
})

