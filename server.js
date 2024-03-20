const express = require('express');
const app = express();
const port = 4000;

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