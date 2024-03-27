const express = require('express');
const bodyParser = require("body-parser"); //Möjlighet att läsa in formulärdata
const app = express();
const port = 3000;
let courseList = [];

//Set view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));  //Statiska filer i "public"
app.use(bodyParser.urlencoded({extended: true})); //Ta emot formulärdata

//Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.post("/form", (req, res) => {
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

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});


/*
//MYSQL
const mysql = require("mysql");

//Anslutningsinställningar
const connection = mysql.createConnection({
    host: "localhost",
    user: "course-project",
    password: "password",
    database: "course-project"
});

connection.connect((err) => {
    if (err) {
        console.log("connection failed" + err)
        return;
    }
    console.log("connected to mysql")
});

connection.query(`INSERT INTO courses
(coursecode, coursename, syllabus, progression)
VALUES(?, ?, ?, ?);`, [], (err, results) => {
if (err) throw err;
console.table(results);
});*/