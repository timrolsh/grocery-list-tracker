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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/modifyList", (req, res) => {
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/read_table.sql", {
            encoding: "UTF-8",
        }),
        (error, results) => {
            if (error) {
                res.status(500).send(error); //Internal Server Error
            } else {
                res.render("modifyList", { groceryList: results });
            }
        }
    );
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

app.post("/useList/item-in-cart", (req, res) => {
    res.send("got it");
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/change_item_in_cart.sql", {
            encoding: "UTF-8",
        }),
        [req.body.setTo, req.body.id]
    );
});

app.get("/useList/reset-all", (req, res) => {
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/reset_items_in_cart.sql", {
            encoding: "UTF-8",
        })
    );
    res.send("items updated");
});

app.get("/modifyList/clear_shopping_list", (req, res) => {
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/empty_shopping_list.sql", {
            encoding: "UTF-8",
        })
    );
    res.send("shopping list cleared");
});

app.post("/modifyList/remove-item", (req, res) => {
    // remove_item_in_cart
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/remove_item_in_cart.sql", {
            encoding: "UTF-8",
        }),
        [req.body.id]
    );
    res.send("item removed");
});

app.post("/modifyList/add-item", (req, res) => {
    // add_data.sql
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/add_data.sql", {
            encoding: "UTF-8",
        }),
        [req.body.item_name, req.body.item_count]
    );
    res.send("item added");
});

app.get("/modifyList/editItem:id", (req, res) => {
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/read_item_from_list.sql", {
            encoding: "UTF-8",
        }),
        [parseInt(req.params.id.substring(1))],
        (error, results) => {
            if (error) {
                res.status(500).send(error); //Internal Server Error
            } else {
                res.render("editItem", { item: results[0] });
            }
        }
    );
});

app.post("/modifyList/editItem", (req, res) => {
    db.execute(
        fs.readFileSync(__dirname + "/db/queries/update_item.sql", {
            encoding: "UTF-8",
        }),
        [req.body.item_name, req.body.item_count, req.body.item_id]
    );
    res.send("item updated");
});

app.listen(port, () => {
    console.log(
        `App server listening on ${port}. (Go to http://localhost:${port})`
    );
});
