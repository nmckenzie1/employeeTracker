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
          name: "Add Sprite",
          value: "ADD_SPRITE"
        },
        {
          name: "Update Sprite Role",
          value: "UPDATE_SPRITE_ROLE"
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
          name: "View All Jobs",
          value: "VIEW_JOBS"
        },
        {
          name: "Add Job",
          value: "ADD_JOB"
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
    case "ADD_SPRITE":
      return addSprite();
    case "UPDATE_SPRITE_ROLE":
      return updateSpriteRole();
    case "VIEW_JOBS":
      return viewJobs();
    case "ADD_JOB":
      return addJob();
    case "VIEW_ROLES":
      return viewRole();
    case "ADD_ROLE":
      return addRole();
    default:
      return quit();
  }
}
function viewSprites() {
  connection.query("SELECT sprite.id, sprite.first_name, sprite.last_name, role.title, job.name from sprite LEFT JOIN role on sprite.role_id = role.id LEFT JOIN job on role.job_id = job.id", function(err,res){
    console.log("\n");
    console.table(res)
    loadMainPrompts();
  });
}
function viewJobs() {
  connection.query("SELECT * from job", function(err,res){
    console.log("\n");
    console.table(res)
    loadMainPrompts();
  });
}
function viewRole() {
  connection.query("SELECT role.id, role.title, job.name from role LEFT JOIN job on role.job_id = job.id", function(err,res){
    console.log("\n");
    console.table(res)
    loadMainPrompts();
  });
}
async function addRole() {
   connection.query("SELECT * from job", function(err,res){

    const jobs = res

    const jobChoices = jobs.map(({ id, name }) => ({
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
        name: "job_id",
        message: "Which job does this role do?",
        choices: jobChoices
      }
    ])
    .then(answers => {connection.query("INSERT INTO role SET ?", answers);
    console.log(`Added role to the database`);
    loadMainPrompts();}
    )
   
})}

async function addJob() {
  await inquirer.prompt([
      {
        name: "name",
        message: "What is the name of the Job?"
      },
    ])
    .then(answers => {connection.query("INSERT INTO job SET ?", answers);})
   console.log("Job Added") 
   loadMainPrompts()
}

function addSprite() {
  connection.query("SELECT * from role", function(err,res){
    const roles = res

    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    inquirer.prompt([
      {
        name: "first_name",
        message: "Sprite's First name?"
      },
      {
        name: "last_name",
        message: "Sprite's Last name?"
      },
      {
        type: "list",
        name: "role_id",
        message: "Which role does this sprite play?",
        choices: roleChoices
      }
    ])
    .then(answers => {connection.query("INSERT INTO sprite SET ?", answers);
    console.log(`Added sprite to the database`);
    loadMainPrompts();}
    )
   })}

function updateSpriteRole(){
  connection.query("SELECT * from sprite", function(err,res){
    const sprites = res
    const spriteChoices = sprites.map(({id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Which sprite's role do you want to update?",
        choices: spriteChoices
      } 
    ]).then(answers => updateSpriteRole2(answers))
    })
   
  }
  function updateSpriteRole2(sprite){
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
          ]).then(answers => {connection.query("UPDATE employee SET ? where ?", [answers, sprite]);
          console.log(`Sprite Updated Success`);
          loadMainPrompts();})
      
      })}
  
      function quit() {
        console.log("PEACE");
        process.exit();
      }