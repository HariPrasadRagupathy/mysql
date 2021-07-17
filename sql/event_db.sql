
-- -----------------------------------------------------
-- Table `event_db`.`user_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `event_db`.`user_table` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC));
  
  ALTER TABLE `event_db`.`user_table` 
ADD COLUMN `user_name` VARCHAR(45) NULL AFTER `user_id`,
ADD COLUMN `user_password` VARCHAR(45) NULL AFTER `user_name`,
ADD COLUMN `user_professtion` VARCHAR(100) NULL AFTER `user_password`;

