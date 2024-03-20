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
VALUES(?, ?, ?, ?)`, ["DT207G", "Beckendbaserad webbutveckling", "URL hittepå", "B"], (err, results) => {
if (err) throw err;
console.table(results);
});