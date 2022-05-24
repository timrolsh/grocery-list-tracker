-- query requires prepared statements, add them in as list of 2 elements as second parameter of db.execute()
INSERT INTO grocery_list 
    (item_name, item_count) 
VALUES 
    (?, ?);