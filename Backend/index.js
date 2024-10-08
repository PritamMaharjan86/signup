
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = 3001;
const AuthRouter = require('./Routes/AuthRouter')
const corsConfig = {
    origin:'*',
    credential: true,
    methods:["GET","POST","PUT","DELETE"],
}

require('dotenv').config();
require('./Models/Database')


app.get('/server', (req, res) => {
    res.send('Server is running now...');
})

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter);
app.options("", cors(corsConfig))

app.listen(PORT || process.env.PORT, () => {
    console.log(`Server is running on ${PORT}`);

})
