if (process.env.MODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Trip = require("./models/trip");
const { captureRejectionSymbol } = require("events");

// const dbUrl = "mongodb://localhost:27017/aviacorp"
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('home');
});

app.get('/newtrip', async (req, res) => {
    const trip = new Trip({
        title: "Key West cloud",
        description: "EAT: ir a dejar pasajeros",
        location: "Key West"
    });
    await trip.save();
    res.send(trip);
    // {"title":"Key West","description":"EAT: ir a dejar pasajeros","location":"Key West","_id":"62b64f9b9d1260c7307efd4a","__v":0}
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});