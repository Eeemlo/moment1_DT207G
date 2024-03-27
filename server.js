const { Client } = require("pg");
const express = require('express');
require("dotenv").config();

const app = express();

/*const bodyParser = require("body-parser"); //Möjlighet att läsa in formulärdata*/ //Behövs inte nu?
const port = process.env.PORT;
let courseList = [];

//Set view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));  //Statiska filer i "public"
app.use(express.urlencoded({extended: true})); //Ta emot formulärdata


//Anslut till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect((err) => {
    if(err) {
        console.log("fel vid anslutning" + err)
    } else {
        console.log("ansluten till databasen...")
    }
});


//Routing
app.get("/", async(req, res) => {
    res.render("index");
});

app.get("/form", async(req, res) => {
    res.render("form");
});

app.post("/form", async(req, res) => {
        //Läs in formulärdata
        let newCourseName = req.body.coursename;
        let newCourseCode = req.body.coursecode;
        let newSyllabus = req.body.syllabus;
        let newProgression = req.body.progression;

        //Lägg till i array
        courseList.push({
            coursename: newCourseName,
            coursecode: newCourseCode,
            syllabus: newSyllabus,
            progression: newProgression
        })
    res.render("form")
});

app.get("/about", async(req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});


