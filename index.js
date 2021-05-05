// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [];

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project? (Required)",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                }
                else {
                    console.log("Please enter a project title");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                }
                else {
                    console.log("Please enter a project description");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmTable",
            message: "Would you like to include a Table of Contents?",
            default: true
        },
        {
            type: "input",
            name: "tableOfContent",
            message: ""
        },
        {
            type: "input",
            name: "installation",
            message: "Provide the steps required to install your project"
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples for use"
        },
        {
            type: "input",
            name: "contributing",
            message: "Provide guidelines on how other developers can contribute to this project"
        },
        {
            type: "checkbox",
            name: "licenses",
            message: "",
            choices: ["",""]
        },
        {
            type: "input",
            name: "tests",
            message: "Provide tests for the application and examples on how to run them"
        },
        {
            type: "input",
            name: "github",
            message: "What is your GitHub user name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        }

    ])
    .then(answers => console.log(answers));
}

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
//function init() {}

// Function call to initialize app
//init();
