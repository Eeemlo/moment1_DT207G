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

