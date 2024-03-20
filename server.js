const express = require('express');
const app = express();
const port = 5000;

//Set view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));  //Statiska filer i "public"

//Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.get("/about", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});



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
VALUES(?, ?, ?, ?);`, []; (err, results) => {
if (err) throw err;
console.table(results);
});