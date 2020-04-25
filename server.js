const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/html-routes.js");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const Workout = require("./models/Workout.js");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log("DB Connected!"))
    .catch(err => {
        console.log("DB Connection error")
    });

app.use(require("./routes/api-routes.js"));
router(app);

app.listen(PORT, () => {
    console.log("App running on: http://localhost:" + PORT);
});