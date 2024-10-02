
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = 3001;
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config();
require('./Models/Database')

const corsOptions = {
    origin: 'https://signup-beryl-eta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  // Add Content-Type and other headers if needed
};

app.get('/server', (req, res) =>
    res.send('Express on vercel'))

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/auth', AuthRouter);

app.listen(PORT || process.env.PORT, () => {
    console.log(`Server is running on ${PORT}`);

})
