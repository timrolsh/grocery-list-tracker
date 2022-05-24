const express = require("express");
const app = express();
const port = 8080;
const logger = require("morgan");
const db = require("./db/db_connection");
const fs = require("fs");

// express set up with ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/modifyList", (req, res) => {
    res.render("modifyList");
});
app.get("/useList", (req, res) => {
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/read_table.sql", {
            encoding: "UTF-8",
        }),
        (error, results) => {
            if (error) {
                res.status(500).send(error); //Internal Server Error
            } else {
                res.render("useList", { groceryList: results });
            }
        }
    );
});

app.listen(port, () => {
    console.log(
        `App server listening on ${port}. (Go to http://localhost:${port})`
    );
});
