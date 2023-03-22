use `billboard`;

DROP TABLE IF EXISTS `follow`;
DROP TABLE IF EXISTS `entry`;
DROP TABLE IF EXISTS `reply`;
DROP TABLE IF EXISTS `room`;
DROP TABLE IF EXISTS `user`;

-- 유저테이블 만들 자리 
CREATE TABLE IF NOT EXISTS `user` (
  `userId` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `experience` INT(11) NULL DEFAULT NULL,
  `matchCount` INT(11) NULL DEFAULT '0',
  `nickname` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(64) NULL DEFAULT NULL,
  `refreshToken` VARCHAR(200) NULL DEFAULT NULL,
  `state` VARCHAR(10) NULL DEFAULT 'offline',
  `winCount` INT(11) NULL DEFAULT '0',
  `img` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe` (`email` ASC) 
);

CREATE TABLE `room` (
	`roomId` bigint NOT NULL AUTO_INCREMENT,
	`hostId` varchar(45) NOT NULL,
	`title` varchar(45) NOT NULL,
	`personLimit` int NOT NULL,
	`location` varchar(45) DEFAULT NULL,
	`date` datetime DEFAULT NULL,
	PRIMARY KEY (`roomId`),
	FOREIGN KEY (hostId) REFERENCES user (userId) on delete cascade
);

CREATE TABLE `reply` (
	`replyId` bigint NOT NULL AUTO_INCREMENT,
	`roomId` bigint NOT NULL,
	`content` varchar(60) NOT NULL,
	`userId` varchar(45) NOT NULL,
	PRIMARY KEY (`replyId`),
	FOREIGN KEY (roomId) REFERENCES room (roomId) on delete cascade,
	FOREIGN KEY (userId) REFERENCES user (userId) on delete cascade
);

CREATE TABLE `entry` (
	`entryId` bigint NOT NULL AUTO_INCREMENT,
	`roomId` bigint NOT NULL,
	`userId` varchar(45) NOT NULL,
	PRIMARY KEY (`entryId`),
	FOREIGN KEY (roomId) REFERENCES room (roomId) on delete cascade,
	FOREIGN KEY (userId) REFERENCES user (userId) on delete cascade
);

CREATE TABLE `follow` (
	`followId` bigint NOT NULL AUTO_INCREMENT,
	`fromUserId` varchar(45) NOT NULL,
	`toUserId` varchar(45) NOT NULL,
	PRIMARY KEY (`followId`),
	FOREIGN KEY (fromUserId) REFERENCES user (userId) on delete cascade,
	FOREIGN KEY (toUserId) REFERENCES user (userId) on delete cascade
);
