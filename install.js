const { Client } = require("pg");
require("dotenv").config();

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

//Skapa tabell

client.query(`
CREATE TABLE courses(
        id SERIAL PRIMARY KEY,
        coursecode VARCHAR(6) NOT NULL,
        coursename VARCHAR(100) NOT NULL,
        syllabus VARCHAR(255) NOT NULL,
        progression CHAR(1) NOT NULL,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);


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


//SQL-fråga
connection.query("DROP TABLE IF EXISTS courses;", (err, results) => {
    if (err) throw err;

    console.log("dropped database users" + results);

});
connection.query(`CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursecode CHAR(6),
    coursename VARCHAR(100),
    syllabus VARCHAR(250),
    progression CHAR(1),
    post_created DATETIME DEFAULT CURRENT_TIMESTAMP);`, (err, results) => {
    if (err) throw err;

    console.log("TABLE CREATED " + results)
});


connection.query(`INSERT INTO courses
(coursecode, coursename, syllabus, progression)
VALUES(?, ?, ?, ?);`, [], (err, results) => {
if (err) throw err;
console.table(results);
});*/