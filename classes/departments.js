const inquirer = require('inquirer');
const showOutput = require('../helpers/output');

class Departments {
    constructor(sql, callback) {
        this.sql = sql;
        this.callback = callback;
    }

    viewAll() {
        this.sql.query('SELECT * FROM `departments`', (err, res) => {
            if (err) throw err;
            showOutput(res);
            this.callback();
        });
    }

    add() {
        inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?',
        }).then(answer => {
            this.sql.query('INSERT INTO departments SET ?', { name: answer.name }, (err, res) => {
                if (err) throw err;
                console.log(`Added ${answer.name} to the database`);
                this.callback();
            });
        });
    }
}

module.exports = Departments