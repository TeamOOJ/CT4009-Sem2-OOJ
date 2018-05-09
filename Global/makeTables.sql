CREATE TABLE `s1712027_glosPolice`.`usersTable` ( `userID` INT NOT NULL AUTO_INCREMENT , `Title` VARCHAR(8) NOT NULL , `firstName` VARCHAR(64) NOT NULL , `lastName` VARCHAR(64) NOT NULL , `dateOfBirth` DATE NOT NULL , `telephoneNumber` VARCHAR(64) NOT NULL , `email` VARCHAR(256) NOT NULL , `password` VARCHAR(32) NOT NULL , PRIMARY KEY (`userID`)) ENGINE = InnoDB; 

CREATE TABLE `s1712027_glosPolice`.`bikesTable` ( `bikeID` INT NOT NULL AUTO_INCREMENT , `nickname` VARCHAR(128) NOT NULL , `manufacturer` VARCHAR(256) NOT NULL , `model` VARCHAR(256) NOT NULL , `type` VARCHAR(64) NOT NULL , `mpn` VARCHAR(128) NOT NULL , `colour` VARCHAR(128) NOT NULL , `wheelSize` VARCHAR(8) NOT NULL , `numberOfGears` INT NOT NULL , `typeOfBreaks` VARCHAR(64) NOT NULL , `suspension` VARCHAR(64) NOT NULL , `gender` VARCHAR(32) NOT NULL , `ageGroup` VARCHAR(32) NOT NULL , `commonParkingPlace` VARCHAR(256) NOT NULL , `useCase` VARCHAR(64) NOT NULL , `otherDetails` TEXT NOT NULL , PRIMARY KEY (`bikeID`)) ENGINE = InnoDB; 


ALTER TABLE `usersTable` ADD `verificationCode` VARCHAR(32) NOT NULL AFTER `password`, ADD `isVerified` BOOLEAN NOT NULL DEFAULT FALSE AFTER `verificationCode`;
ALTER TABLE `usersTable` CHANGE `isVerified` `isVerified` CHAR(1) NOT NULL DEFAULT '0';

ALTER TABLE `usersTable` ADD `privledges` TINYINT(2) NOT NULL DEFAULT '0' AFTER `isVerified`;