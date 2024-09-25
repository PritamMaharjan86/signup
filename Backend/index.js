
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = https://signup-backend-five.vercel.app/;
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config();
require('./Models/Database')


app.get('/server', (req, res) => {
    res.send('Server is running now...');
})

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

})
