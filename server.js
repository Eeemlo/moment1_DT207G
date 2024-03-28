const { Client } = require("pg");
const express = require('express');
require("dotenv").config();

const app = express();

/*const bodyParser = require("body-parser"); //Möjlighet att läsa in formulärdata*/ //Behövs inte nu?
const port = process.env.PORT;

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
app.get("/", async (req, res) => {
    // Läs ut från databasen
    client.query("SELECT * FROM courses ORDER BY created DESC", (err, result) => {
        if (err) {
            console.log("fel vid db-fråga");
        } else {
            res.render("index", {
                courses: result.rows
            });
        }
    });
});

app.get("/form", async(req, res) => {
    res.render("form");
});

app.post("/form", async(req, res) => {

        //Läs in formulärdata
        let newCourseCode = req.body.coursecode;
        let newCourseName = req.body.coursename;
        let newSyllabus = req.body.syllabus;
        let newProgression = req.body.progression;

        //SQL-frågor
        const result = await client.query("INSERT INTO courses(coursecode, coursename, syllabus, progression) VALUES($1,$2,$3,$4)",
        [newCourseCode, newCourseName, newSyllabus, newProgression]
        );

        res.redirect("/");
});

app.get("/about", async(req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});


