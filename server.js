const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Oioz18u4#',
        database: 'employee_cms'
    },
    console.log('connection success')
);

//store cached data here for screens
var employees = [];
var departments = [];
var roles = [];

//setup bottom ui position
var ui = new inquirer.ui.BottomBar();

const MainMenu = async () => {
    let options = ['View All Employees','View All Roles','View All Departments','Add a Department','Add a Role','Add an Employee','Update Employee Role'];
    let prompt = await inquirer.prompt([
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
                await queryEmployees(printTable);
                break;
            case "View All Roles":
                await queryRoles(printTable);
                break;
            case "View All Departments":
                await queryDepartments(printTable);
                break;
            case "Add a Department":
                break;
            case "Add a Role":
                break;
            case "Add an Employee":
                break;
            case "Update Employee Role":
                break;
            default:
                MainMenu();
        }

        //default on break
        setTimeout(() => { MainMenu() }, 100);
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

const queryEmployees = (callback, fields = null) => {
    db.query('SELECT * FROM employee', function (err, results) {
        return callback(results);
    });
}

const queryRoles = (callback, fields = null) => {
    db.query('SELECT * FROM role', function (err, results) {
        return callback(results);
    });
}

const queryDepartments = (callback, fields = null) => {
    db.query('SELECT * FROM department', function (err, results) {
        return callback(results);
    });
}

MainMenu();
