const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
let db;

const MainMenu = () => {
    let options = ['View All Employees','View All Roles','View All Departments','Add a Department','Add a Role','Add an Employee','Update Employee Role'];
    let prompt = inquirer.prompt([
        {
            type: "list",
            message: "What action would you like?",
            choices: options,
            name: "action",
        },
    ])
    .then(async (answers) => {
        switch(answers.action) {
            case "View All Employees":
                printTable(await queryTable('employee'));
                break;
            case "View All Roles":
                printTable(await queryTable('role'));
                break;
            case "View All Departments":
                printTable(await queryTable('department'));
                break;
            case "Add a Department":
                await addDepartment();
                return;
            case "Add a Role":
                await addRole();
                return;
            case "Add an Employee":
                await addEmployee();
                return;
            case "Update Employee Role":
                await updateEmployeeRole();
                return;
        }

        //delay for all callbacks and console termination
        delayMainMenu();
    });
}

const delayMainMenu = () => {
    setTimeout(() => { MainMenu() }, 100);
}

const addDepartment = async () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter New Department Name:",
            name: "name",
        },
    ])
    .then(async (answers) => {
        db.query('INSERT INTO department (name) VALUES (?)',[answers.name]);
        printTable(await queryTable('department'));
        delayMainMenu();
    });
}

const addRole = async () => {
    let departments = await getOptionIDList('department', ['name']);

    inquirer.prompt([
        {
            type: "list",
            message: "What Department is this Role for?",
            choices: departments,
            name: "department_id",
        },
    ])
    .then(async (answers) => {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter New Role Name:",
                name: "title",
            },
            {
                type: "number",
                message: "What is the salary for this Role:",
                name: "salary",
            },
        ])
        .then(async (role) => {
            db.query('INSERT INTO role (department_id, title, salary) VALUES (?,?,?)', [answers.department_id, role.title, role.salary ]);
            printTable(await queryTable('role'));
            delayMainMenu();
        });
    });
}

const addEmployee = async () => {
    let managers = await getOptionIDList('employee', ['first_name', 'last_name']);
    let departments = await getOptionIDList('department', ['name']);

    inquirer.prompt([
        {
            type: "list",
            message: "Who will be their Manager?",
            choices: managers,
            name: "manager_id",
        },
        {
            type: "list",
            message: "What Department will they work?",
            choices: departments,
            name: "department_id",
        },
    ])
    .then(async (answers) => {
        let roles = await getOptionIDList('role', ['title'], [{ department_id: answers.department_id }]);

        inquirer.prompt([
            {
                type: "list",
                message: "What Role will they work?",
                choices: roles,
                name: "role_id",
            },
            {
                type: "input",
                message: "Enter First Name:",
                name: "first_name",
            },
            {
                type: "input",
                message: "Enter Last Name:",
                name: "last_name",
            },
        ])
        .then(async (employee) => {
            console.log(answers.department_id);
            console.log(employee);

            db.query('INSERT INTO employee (role_id, manager_id, first_name, last_name) VALUES (?,?,?,?)',[employee.role_id, answers.manager_id, employee.first_name, employee.last_name]);
            printTable(await queryTable('employee'));
            delayMainMenu();
        });
    });
}

const updateEmployeeRole = async () => {
    let departments = await getOptionIDList('department', ['name']);

    inquirer.prompt([
        {
            type: "list",
            message: "What Department will they work?",
            choices: departments,
            name: "department_id",
        },
    ])
    .then(async (answers) => {
        let roles = await getOptionIDList('role', ['title'], [{ department_id: answers.department_id }]);
        let employees = await getOptionIDList('employee', ['first_name', 'last_name']);

        inquirer.prompt([
            {
                type: "list",
                message: "What Role will they switch to?",
                choices: roles,
                name: "role_id",
            },
            {
                type: "list",
                message: "Which Employee will switch roles?",
                choices: employees,
                name: "id",
            },
        ])
        .then(async (answers) => {
            db.query('UPDATE employee SET role_id='+answers.role_id+' WHERE id='+answers.id);
            printTable(await queryTable('employee'));
            delayMainMenu();
        });
    });
}

const printTable = (records) => {
    //remove index
    let output = [];
    for(record in records) {
        let id = records[record].id;
        delete records[record].id;
        for (field in record)
            output[id] = records[record];
    }
    console.table(output);
}

const getOptionIDList = async (table, fields, filters = []) => {
    let options = [];
    let records = await queryTable(table, fields, filters);

    for (record in records) {
        let option = { value: records[record].id, name: '' };
        for (field in fields) {
            option.name += ' ' + records[record][fields[field]];
        }
        option.name = option.name.trim();
        options.push(option);
    }

    return options;
}

const selectors = (fields) => {
    if (fields[0] == '*') {
        return fields[0]; //return back only option
    } else {
        let selectors = fields.slice();
        //remove id if added manually
        if (selectors.indexOf('id') !== -1)
            selectors.splice(selectors.indexOf('id'), 1);

        //add id back for primaryKey
        selectors.push('id')
        return '`' + selectors.join('`,`') + '`';
    }
}

const filters = (filters) => {
    if (filters.length === 0)
        return '';
    let conditions = '';
    for(filter in filters) {
        for(key in filters[filter]) {
            conditions += '`' + key + '` = "' + filters[filter][key] + '"';
        }
        conditions += ' AND ';
    }
    conditions = 'WHERE ' + conditions.substr(0, conditions.length - 5);
    return conditions;
}

const queryTable = async (table, fields = ['*'], filter = []) => {
    console.log('SELECT ' + selectors(fields) + ' FROM ' + table + ' ' + filters(filter));
    let [records] = await db.execute('SELECT ' + selectors(fields) + ' FROM ' + table + ' ' + filters(filter));
    return records;
}

async function initialize() {
    db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'Oioz18u4#',
            database: 'employee_cms'
        },
        console.log('====> DB Connection Success <====')
    );
}
initialize().then(delayMainMenu);
