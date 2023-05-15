const sql = require('./helpers/sql');
const inquirer = require('inquirer');


const viewTable = (name) => {
    sql.query('SELECT * FROM `'+name+'`', (err, res) => {
        if (err) throw err;

        // Show the response
        const departments = res.map((row) => row.name);
        console.table(departments);
        
        // Exit query
        sql.end();
    });
}

const updateRow = (table, values) => {
    console.log(table);
}

const addRow = (table, values) => {
    console.log(table);
}

const menu = () => {
    inquirer
        .prompt({
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
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewTable('departments');
                    break;
                case 'View all roles':
                    viewTable('roles');
                    break;
                case 'View all employees':
                    viewTable('employees');
                    break;
                case 'Add a department':
                    addRow("department");
                    break;
                case 'Add a role':
                    addRow("role");
                    break;
                case 'Add an employee':
                    addRow("employee");
                    break;
                case 'Update an employee role':
                    updateRow("employee");
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        }
    );
}

// Connect to the MySQL database
sql.connect((err) => {
    if (err) throw err;

    // Run the inquirer menu
    menu();
});