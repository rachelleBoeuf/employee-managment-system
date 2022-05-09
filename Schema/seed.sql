# --reset all tables
DELETE FROM `department`;
DELETE FROM `role`;
DELETE FROM `employee`;

# --insert all seed data
INSERT INTO `department`(`id`, `name`) values(4, 'Corporate Office');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (7, 4, 'CEO', '99000');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`, `first_name`, `last_name`) values (7, 7, null, 'Rachel', 'LeBoeuf');

INSERT INTO `department`(`id`, `name`) values(1, 'Sales');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (1, 1, 'Sales Consultant', '35000');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (2, 1, 'Sales Manager', '55000');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (3, 1, 'Sales Associate', '25000');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`, `first_name`, `last_name`) values (1, 2, 7, 'Susan', 'Marley');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`, `first_name`, `last_name`) values (2, 1, 1, 'Shirley', 'Temple');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`, `first_name`, `last_name`) values (3, 3, 1, 'Bob', 'Marley');

INSERT INTO `department`(`id`, `name`) values(2, 'Human Resources');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (4, 2, 'Complaint Specialist', '27500');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`, `first_name`, `last_name`) values (4, 4, 7, 'Karen', 'Focker');

INSERT INTO `department`(`id`, `name`) values(3, 'Information Technology');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (5, 3, 'Desktop Support', '35000');
INSERT INTO `role`(`id`, `department_id`, `title`, `salary`) values (6, 3, 'Web Developer', '60000');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`, `first_name`, `last_name`) values (5, 5, 7, 'Susan', 'Marley');
INSERT INTO `employee`(`id`, `role_id`, `manager_id`,`first_name`, `last_name`) values (6, 6, null, 'Shirley', 'Temple');
