const { default: inquirer } = require("inquirer");
const pg = require("pg");
const { Pool } = pg
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: process.env.PASSWORD,
    database: 'erd'
})

const selectAllDepartments = async () => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Department");
    console.log(result.rows);
    client.release();
    run();
}
const selectAllRoles = async () => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Role LEFT JOIN Department ON Role.department_id = Department.id");
    console.log(result.rows);
    client.release();
    run();
}
const selectAllEmployees = async () => {
    const client = await pool.connect();
    const result = await client.query(`
    SELECT 
        Employee.id AS employee_id,
        Employee.first_name,
        Employee.last_name,
        Role.title AS role_title,
        Role.salary,
        Department.name AS department_name
    FROM 
        Employee
    JOIN 
        Role ON Employee.role_id = Role.id
    JOIN 
        Department ON Role.department_id = Department.id;`);
    console.log(result.rows);
    client.release();
    run();    
}
const addDepartment = async (departmentName) => {
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO department (name) VALUES (${departmentName})`);
    client.release();  
    console.log("Added department!");
    run();
}
const addRole = async (name, salary, department) => {
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO role (title, salary, department_id) VALUES (${name}, ${salary}, ${department})`);
    client.release();  
    console.log("Added role!");
    run();
}
const updateEmployee = async (employeeId, roleId) => {
    const client = await pool.connect();
    const result = await client.query(`
        UPDATE Employee
        SET role_id = ${roleId}
        WHERE id = ${employeeId};
        `);
    run();
}
const handleChoice = (choice) => {
    switch(choice){
        case "View Departments":
            selectAllDepartments();
            return
        case "View Roles":
            selectAllRoles();
            return
        case "View Employees":
            selectAllEmployees();
            return
        case "Add Department":
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the department?"
                }
            ])
            .then((answers) => {
                addDepartment(answers["name"])
            })
            return
        case "Add Role":
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "input",
                    name: "department",
                    message: "What is the id of the department?"
                }
            ])
            .then((answers) => {
                addRole(answers["name"], answers["salary"], answers["department"])
            })
            return
        case "Update Employee role":
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "employeeId",
                    message: "What is the id of the employee?"
                },
                {
                    type: "input",
                    name: "roleId",
                    message: "What is the id of the role?"
                }
            ])
            .then((answers) => {
                updateEmployee(answers["employeeId"], answers["roleId"])
            })
            return
    }
}
const listAndHandleOptions = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "action",
            message: "Pick an Option",
            choices: [
                "View Departments", 
                "View Roles",
                "View Employees",
                "Add Department",
                "Add Role",
                "Update Employee role"
            ]
        }
    ])
    .then((answers) => {
        handleChoice(answers["action"])
    })
}
const run = async () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "continue",
                message: "Welcome to the ERD sql database. Would you like to view and edit the sql records?",
                choices: [
                    "Yes", 
                    "No"
                ]
            }
        ])
        .then((answers) => {
            if (answers["continue"] == "Yes"){
                listAndHandleOptions();
            } else {
                process.exit(0);
            }
        })
    }
run();