const inquirer = require('inquirer');
const showOutput = require('../helpers/output');

class Employees {
    constructor(sql, callback) {
        this.sql = sql;
        this.callback = callback;
    }

    viewAll() {
        this.sql.query('SELECT * FROM employees', (err, res) => {
            if (err) throw err;
            showOutput(res);
            this.callback();
        });
    }

    add() {
        this.sql.query('SELECT * FROM roles', (err, roles) => {
            if (err) throw err;

            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id,
            }));

            this.sql.query('SELECT * FROM employees', (err, employees) => {
                if (err) throw err;

                const managerChoices = employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }));

                inquirer.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the employee\'s first name?',
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the employee\'s last name?',
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: 'What is the employee\'s role?',
                        choices: roleChoices,
                    },
                    {
                        name: 'manager_id',
                        type: 'list',
                        message: 'Who is the employee\'s manager?',
                        choices: [...managerChoices, { name: "None", value: null }],
                    },
                ]).then(answers => {
                    this.sql.query('INSERT INTO employees SET ?', {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                        role_id: answers.role_id,
                        manager_id: answers.manager_id,
                    }, (err, res) => {
                        if (err) throw err;
                        console.log(`Added ${answers.first_name} ${answers.last_name} to the database`);
                        this.callback();
                    });
                });
            });
        });
    }

    update() {
        this.sql.query('SELECT * FROM employees', (err, employees) => {
            if (err) throw err;

            const employeeChoices = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));

            this.sql.query('SELECT * FROM roles', (err, roles) => {
                if (err) throw err;

                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id,
                }));

                inquirer.prompt([
                    {
                        name: 'employee_id',
                        type: 'list',
                        message: 'Which employee\'s role do you want to update?',
                        choices: employeeChoices,
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: 'What role do you want to assign to the employee?',
                        choices: roleChoices,
                    },
                ]).then(answers => {
                    this.sql.query('UPDATE employees SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], (err, res) => {
                        if (err) throw err;
                        console.log(`Updated employee's role in the database`);
                        this.callback();
                    });
                });
            });
        });
    }
}

module.exports = Employees;
