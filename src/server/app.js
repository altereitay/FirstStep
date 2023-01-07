const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())


app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profiles', require('./routes/profiles'))
app.use('/api/jobs', require('./routes/jobs'))


module.exports = app;