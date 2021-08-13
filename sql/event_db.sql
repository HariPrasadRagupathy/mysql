
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

ALTER TABLE `event_db`.`user_table` 
ADD COLUMN `user_email` VARCHAR(45) NOT NULL AFTER `user_professtion`,
ADD UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE;
;

  ALTER TABLE `event_db`.`user_table` 

MODIFY COLUMN `user_password` VARCHAR(1024) NULL AFTER `user_name`;

 ALTER TABLE `event_db`.`user_table` CHANGE COLUMN `user_professtion` `user_professtion` INT NULL DEFAULT NULL ;

CREATE TABLE `event_db`.`EventType` (
  `eventId` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(100) NULL,
  `eventDescription` VARCHAR(200) NULL,
  PRIMARY KEY (`eventId`));


CREATE TABLE `event_db`.`UserProfession` (
  `professionId` INT NOT NULL AUTO_INCREMENT,
  `professionName` VARCHAR(100) NULL,
  `professionDescription` VARCHAR(100) NULL,
  PRIMARY KEY (`professionId`));


CREATE TABLE `event_db`.`category_table` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(45) NULL,
  `categoryDescription` VARCHAR(100) NULL,
  PRIMARY KEY (`categoryId`));

  CREATE TABLE `event_db`.`events_table` (
  `eventId` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(45) NULL,
  `eventImgUrl` VARCHAR(100) NULL,
  `eventTypeId` INT NOT NULL,
  `categoryId` INT NOT NULL,
  `hostId` INT NOT NULL,
  `eventDate` DATETIME NOT NULL,
  `eventTime` DATETIME NOT NULL,
  `eventDuration` VARCHAR(45) NULL,
  `isEventRepetable` TINYINT NULL DEFAULT 0,
  `eventDescription` VARCHAR(100) NULL,
  PRIMARY KEY (`eventId`));

