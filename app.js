const express = require("express");
const app = express();
const port = 8080;
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.get("/modifyList", (req, res) => {
    res.sendFile(__dirname + "/views/modifyList.html");
});
app.get("/useList", (req, res) => {
    res.sendFile(__dirname + "/views/useList.html");
});

app.listen(port, () => {
    console.log(
        `App server listening on ${port}. (Go to http://localhost:${port})`
    );
});
