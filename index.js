const inquirer = require('inquirer');


function showAddManager() {
inquirer
    .prompt([
    {
        type: "input",
        message: "What is the Manager's Name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is the Manager's ID?",
        name: "id",
    },
    {
        type: "input",
        message: "What is the Manager's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is the Manager's office number?",
        name: "officeNumber",
    },
    ])
    .then((answers) => {
        console.log(answers);
        manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        showMainMenu();
    });
}
