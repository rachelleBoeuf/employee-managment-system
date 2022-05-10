-- HOST: localhost
-- USER: root
-- PASS: Linksys123.
USE employee_cms;

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `department_id` INT NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL(7,2) NOT NULL
);

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `role_id` INT NOT NULL,
    `manager_id` INT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL
);
