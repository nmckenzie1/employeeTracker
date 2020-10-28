const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer")
const cTable = require('console.table');
// const express = require("express")

const connection = mysql.createConnection({
  host: "localhost",
  user: "36CHAMBERS",
  password: "WUTANG",
  database: "employees"
});

connection.connect();

// connection.query = util.promisify(connection.query);

loadMainPrompts()

async function loadMainPrompts() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Sprites",
          value: "VIEW_SPRITES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ])
  switch (choice) {
    case "VIEW_SPRITES":
      return viewSprites();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
   case "ADD_EMPLOYEE":
      return addEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    default:
      return quit();
  }
}
function viewSprites() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name from employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", function(err,res){
    console.log("\n");
    console.table(res)
    loadMainPrompts();
  });
}
function viewDepartments() {
  connection.query("SELECT * from department", function(err,res){
    console.log("\n");
    console.table(res)
    loadMainPrompts();
  });
}
function viewRoles() {
  connection.query("SELECT * from role", function(err,res){
    console.log("\n");
    console.table(res)
    loadMainPrompts();
  });
}
async function addRole() {
   connection.query("SELECT * from department", function(err,res){

    const departments = res

    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
     inquirer.prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ])
    .then(answers => {connection.query("INSERT INTO role SET ?", answers);
    console.log(`Added role to the database`);
    loadMainPrompts();}
    )
   
})}

async function addDepartment() {
  await inquirer.prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      },
    ])
    .then(answers => {connection.query("INSERT INTO department SET ?", answers);})
   console.log("Department Added") 
   loadMainPrompts()
}

function addEmployee() {
  connection.query("SELECT * from role", function(err,res){
    const roles = res

    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    inquirer.prompt([
      {
        name: "first_name",
        message: "Employees First name?"
      },
      {
        name: "last_name",
        message: "Employees Last name?"
      },
      {
        type: "list",
        name: "role_id",
        message: "Which role does this employee have?",
        choices: roleChoices
      }
    ])
    .then(answers => {connection.query("INSERT INTO employee SET ?", answers);
    console.log(`Added employee to the database`);
    loadMainPrompts();}
    )
   })}

function updateEmployeeRole(){
  connection.query("SELECT * from employee", function(err,res){
    const employees = res
    const employeeChoices = employees.map(({id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      } 
    ]).then(answers => updateEmployeeRole2(answers))
    })
   
  }
  function updateEmployeeRole2(employee){
    connection.query("SELECT * from role", function(err,res){
          const roles = res
          const rolesChoices = roles.map(({id, title}) => ({
            name: title,
            value: id
          }));
          inquirer.prompt([
            {
              type: "list",
              name: "role_id",
              message: "Which role do you want to assign?",
              choices: rolesChoices
            } 
          ]).then(answers => {connection.query("UPDATE employee SET ? where ?", [answers, employee]);
          console.log(`Employee Updated Success`);
          loadMainPrompts();})
      
      })}
  
      function quit() {
        console.log("PEACE");
        process.exit();
      }