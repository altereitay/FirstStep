const express = require('express');
const app = express();
app.use(express.json());


app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profiles', require('./routes/profiles'))


module.exports = app;