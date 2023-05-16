const sql = require('./helpers/sql');
const inquirer = require('inquirer');

// Database classes
const Departments = require('./classes/departments')
const Employees = require('./classes/employees')
const Roles = require('./classes/roles')

// ASCII art
const figlet = require('figlet');
let logo = "";

figlet.text("Employee\nTracker", {
    font: "Big",
}, (err, data) => {
    if (err) { console.dir(err); return }
    logo = data;
});

// Menu for the user to select what they want to do
const menu = () => {

    // Prompt the user for what they want to do
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    })
    .then(answer => {
        // Create the classes for each table
        const department = new Departments(sql, menu);
        const role = new Roles(sql, menu);
        const employee = new Employees(sql, menu);

        // Switch statement to determine what to do based on the user's answer
        switch (answer.action) {
            case 'View all departments':
                department.viewAll();
                break;
            case 'View all roles':
                role.viewAll();
                break;
            case 'View all employees':
                employee.viewAll();
                break;
            case 'Add a department':
                department.add();
                break;
            case 'Add a role':
                role.add();
                break;
            case 'Add an employee':
                employee.add();
                break;
            case 'Update an employee role':
                employee.update();
                break;
            case 'Exit':
                sql.end();
                break;
        }
    });
};

// Connect to the MySQL database
sql.connect((err) => {
    // Throw an error if there is one connecting to the database
    if (err) throw err;

    // Show the logo and start the menu
    console.log(logo);

    // Start the menu
    menu();
});