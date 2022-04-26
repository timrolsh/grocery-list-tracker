const db = require("./db_connection");
const fs = require("fs");

db.execute(
    fs.readFileSync(__dirname + "/queries/create_table.sql", {
        encoding: "UTF-8",
    })
);

db.end();