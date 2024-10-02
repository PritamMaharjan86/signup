
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = 3001;
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config();
require('./Models/Database')


app.get('/server', (req, res) =>
    res.send('Express on vercel'))

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://backend-lilac-seven-15.vercel.app/'
}));
app.use('/auth', AuthRouter);

app.listen(PORT || process.env.PORT, () => {
    console.log(`Server is running on ${PORT}`);

})
