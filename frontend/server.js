const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const URL = `http://localhost:3001`;

// Define route to render the index view
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/getprofile', (req, res) => {
    res.render('getprofile');
});
app.get('/getcarts', (req, res) => {
    res.render('getcarts');
});
app.get('/product', (req, res) => {
    res.render('Product');
});

app.listen(3001, () => {
    console.log("App Listen On Port 3001")
});
