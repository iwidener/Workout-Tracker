const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");

const databaseUrl = "workout";
const collections = ["exercise"];
const db = mongojs(databaseUrl, collections);

const PORT = process.env.PORT || 3000;

//const db = require("./models")

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

db.on("error", error => {
    console.log("Databse Error:", error);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{   useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log("DB Connected!"))
.catch(err => {
    console.log("DB Connection error")
});

//app.use(require("./public/api.js"));

app.listen(PORT, () => {
    console.log("App running on: http://localhost:" + PORT);
});