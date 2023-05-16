const inquirer = require('inquirer');
const showOutput = require('../helpers/output');

class Role {
    constructor(sql, callback) {
        this.sql = sql;
        this.callback = callback;
    }

    viewAll() {
        this.sql.query('SELECT * FROM roles', (err, res) => {
            if (err) throw err;
            showOutput(res);
            this.callback();
        });
    }

    add() {
        this.sql.query('SELECT * FROM departments', (err, departments) => {
            if (err) throw err;

            const departmentChoices = departments.map(dept => ({
                name: dept.name,
                value: dept.id,
            }));

            inquirer.prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the title of the role?',
                },
                {
                    name: 'salary',
                    type: 'number',
                    message: 'What is the salary for this role?',
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'Which department does the role belong to?',
                    choices: departmentChoices,
                },
            ]).then(answers => {
                this.sql.query('INSERT INTO roles SET ?', {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.department_id,
                }, (err, res) => {
                    if (err) throw err;
                    console.log(`Added ${answers.title} to the database`);
                    this.callback();
                });
            });
        });
    }
}

module.exports = Role;