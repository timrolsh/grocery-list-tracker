CREATE TABLE `webapp2122t3_timrol24`.`grocery_list` (
    `item_id` INT NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(45) NOT NULL,
    `item_count` INT NOT NULL,
    `item_in_cart` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`item_id`)
);