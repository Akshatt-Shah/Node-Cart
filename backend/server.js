
const express = require('express');

const router = require('./routes/productroutes');
const route = require('./routes/userroutes');
const proute = require('./routes/profileroutes');
const croute = require('./routes/cartroutes');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT
app.listen(PORT, (req, res) => {
    console.log(`App listening on port : ${PORT}`);
})

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Mongo DB Connected Successfully..............")
    })
    .catch((err) => {
        console.log(err)
    })
app.use(router);
app.use(route);
app.use(proute);
app.use(croute);
