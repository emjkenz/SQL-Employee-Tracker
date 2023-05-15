const {exec} = require('child_process');
const dotenv = require('dotenv');
dotenv.config();

const schema = './sql/schema.sql'
const seeder = './sql/seeder.sql'

const host = process.env.HOSTNAME;
const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

setTimeout(() => exec(`mysql -h${host} -u${username} ${database} < ${schema}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}),500)

setTimeout(() => exec(`mysql -h${host} -u${username} ${database} < ${seeder}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}), 1000)