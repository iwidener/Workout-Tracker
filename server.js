const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/Workout.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
    {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log("DB Connected!"))
    .catch(err => {
        console.log("DB Connection error")
    });

app.get("/", function (req, res) {
    Workout.find({}, function (err, workouts) {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "./public/index.html"));
        }
    });
});

app.listen(PORT, () => {
    console.log("App running on: http://localhost:" + PORT);
});