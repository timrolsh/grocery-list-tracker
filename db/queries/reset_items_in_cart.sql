-- resets all item_in_cart values for all objects in the list to 0
UPDATE
    grocery_list
SET
    item_in_cart = 0