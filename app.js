const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('home');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});