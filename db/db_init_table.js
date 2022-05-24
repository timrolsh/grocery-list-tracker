const db = require("./db_connection");
const fs = require("fs");

// reset database if there is already something in there
db.execute(
    fs.readFileSync(__dirname + "/queries/clear_table.sql", {
        encoding: "UTF-8",
    })
);

// create new table
db.execute(
    fs.readFileSync(__dirname + "/queries/create_table.sql", {
        encoding: "UTF-8",
    })
);

// add some sample data to table
db.execute(
    fs.readFileSync(__dirname + "/queries/add_sample_data.sql", {
        encoding: "UTF-8",
    }),
    ["Apples", "5"]
);
db.execute(
    fs.readFileSync(__dirname + "/queries/add_sample_data.sql", {
        encoding: "UTF-8",
    }),
    ["Oranges", "2"]
);
db.execute(
    fs.readFileSync(__dirname + "/queries/add_sample_data.sql", {
        encoding: "UTF-8",
    }),
    ["Pears", "4"]
);
db.execute(
    fs.readFileSync(__dirname + "/queries/add_sample_data.sql", {
        encoding: "UTF-8",
    }),
    ["Chicken Wings (6 pack)", "1"]
);
db.execute(
    fs.readFileSync(__dirname + "/queries/add_sample_data.sql", {
        encoding: "UTF-8",
    }),
    ["Blueberries(pack)", "2"]
);
db.execute(
    fs.readFileSync(__dirname + "/queries/add_sample_data.sql", {
        encoding: "UTF-8",
    }),
    ["Chips(large pack)", "1"]
);

// query database for all elements
db.execute(
    fs.readFileSync(__dirname + "/queries/read_table.sql", {
        encoding: "UTF-8",
    }),
    (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
    }
);
db.end();
