CREATE DATABASE IF NOT EXISTS cosmere;

USE cosmere;

CREATE TABLE `series` (
	`series_id` INT PRIMARY KEY AUTO_INCREMENT,
	`series_title` VARCHAR(100) NOT NULL
);

CREATE TABLE `books` (
	`book_id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `series_id` INT,
    `publication_date` DATE,
    FOREIGN KEY (`series_id`) REFERENCES `series` (`series_id`)
);

CREATE TABLE `planets` (
	`planet_id` INT PRIMARY KEY AUTO_INCREMENT,
    `planet_name` VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE `magic_systems` (
	`magic_system_id` INT PRIMARY KEY AUTO_INCREMENT,
    `system_name` VARCHAR(50) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE `characters` (
	`character_id` INT PRIMARY KEY AUTO_INCREMENT,
    `char_first_name` VARCHAR(100) NOT NULL,
    `char_last_name` VARCHAR(100),
    `planet_of_origin` INT,
    `is_cosmere_aware` BOOLEAN DEFAULT FALSE,
    `main_series` INT,
    FOREIGN KEY (`planet_of_origin`) REFERENCES `planets` (`planet_id`),
    FOREIGN KEY (`main_series`) REFERENCES `series` (`series_id`)
);

CREATE TABLE `book_characters` (
	`book_id` INT,
    `character_id` INT,
    PRIMARY KEY (`book_id`, `character_id`),
    FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`)
);

CREATE TABLE `character_magic_abilities` (
	`character_id` INT,
    `magic_system_id` INT,
    `specific_abilities` TEXT,
    PRIMARY KEY (`character_id`, `magic_system_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`),
    FOREIGN KEY (`magic_system_id`) REFERENCES `magic_systems` (`magic_system_id`)
);