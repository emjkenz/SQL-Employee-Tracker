const sql = require('./helpers/sql');
const inquirer = require('inquirer');
const {Department} = require('./classes/tables')

const showOutput = (array) => {
    // Remove the index in console.table
    // https://stackoverflow.com/questions/49618069/remove-index-from-console-table
    const transformed = array.reduce((arr, { id, ...x }) => { arr[id] = x; return arr }, {})
    console.table(transformed)
}

const viewTable = (name, key) => {
    sql.query('SELECT * FROM `'+name+'`', (err, res) => {
        if (err) throw err;
        
        if (returnArray) return res.map(row => row['key'])
        // Show the response
        const departments = res.map(row => new Department(row.id, row.name));
        showOutput(departments);
        
        // Go back to the main menu
        menu();
    });
}

const updateRow = (table, values) => {
    console.log(table);
}

const addDepartment = () => {
    inquirer.prompt({
        name: 'department',
        type: 'text',
        message: 'What is the name of the department?',
    }).then( answer => {
        sql.query('INSERT INTO departments (name) VALUES(?)', [answer.department], (err, res) => {
            if (err) throw err;

            console.log(`Added ${answer.department} to the database`);

            // Go back to the main menu
            menu();
        })
    })
}

const addRole = () => {
    sql.query('SELECT * FROM `departments`', (err, res) => {
        if (err) throw err;

        let roles = res.map(department => ({
            value: department.id,
            name: department.name
        }));

        inquirer.prompt([
            {
                name: 'name',
                type: 'text',
                message: 'What is the name of the role?',
            },
            {
                name: 'salary',
                type: 'number',
                message: 'What is the salary for this role?',
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does this role belong to?',
                choices: roles,
            }
        ]).then((answers) => {
            sql.query(
                'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
                [answers.name, answers.salary, answers.department],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Added ${answers.name} to the database`);
                    // Go back to the main menu
                    menu();
                }
            );
        });
    });
};


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
        .then( answer => {
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
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addRow("employee");
                    break;
                case 'Update an employee role':
                    updateRow("employee");
                    break;
                case 'Exit':
                    sql.end();
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