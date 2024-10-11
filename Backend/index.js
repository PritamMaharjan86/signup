const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const PORT = 3001;
const AuthRouter = require('./Routes/AuthRouter');
const corsConfig = {
    origin: '*',
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

require('dotenv').config();
require('./Models/Database');


app.get('/server', (req, res) => {
    res.send('Server is running now...');
});


app.use(bodyParser.json());
app.use(cors(corsConfig));


app.use('/auth', AuthRouter);


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${process.env.PORT || PORT}`);
});
