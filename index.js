// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const fetch = require("node-fetch");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [ 
    { 
        inputName: "title",
        inputMessage: "What is the title of the project?"
    },
    {
        inputName: "description",
        inputMessage: "Provide a description of the project."
    },
    {
        inputName: "installation",
        inputMessage: "Provide the steps required to install the project."
    },
    {
        inputName: "usage",
        inputMessage: "Provide instructions and examples for usage."
    },
    {
        inputName: "contributing",
        inputMessage: "Provide guidelines to how other develpers can contribute to this project."
    },
    {
        inputName: "tests",
        inputMessage: "Provide tests for the application and examples on how to run them"
    },
    {
        inputName: "github",
        inputMessage: " What is your GitHub username?"
    },
    {
        inputName: "email",
        inputMessage: "What is your email address?"
    }
];

var promptInput = questions.map( field => {
    return {
            type: "input",
            name: field.inputName,
            message: field.inputMessage,
            validate: input => {
                if (input) {
                    return true;
                }
                else {
                    console.log("Please enter " + inputName + "information about the project!");
                    return false;
                }
            }
        }
    });

// gather license information
const licenseInfo = () => {
    var apiUrl = "https://api.github.com/licenses";

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let licensePrompt = 
                    {
                        type: "list",
                        name: "license",
                        message: "Which license applies to the project?",
                        choices: data.map(license => license.name)
                    }

                    var licenseData = data;
                    
                    //console.log(licensePrompt);
                    promptInput.push(licensePrompt);
                    console.log(promptInput);

                    return licenseData;
                })
            }
        })
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, generateMarkdown(data), err => {
            if (err) {
                reject(err);
                return;
            }
            resolve ({
                ok: true,
                message: `New README ${fileName} has been successfully created!`
            });
        });
    });
}

// TODO: Create a function to initialize app
function init() {
    console.log(
        `
        ==================================
         Provide details for a new README
        ==================================
        `
    );
    // start question prompt
    return inquirer.prompt(promptInput)
            .then(answers =>(console.log(answers)));

            // .then(writeToFile(answers.title, answers))
            // .catch(err => {
            //     console.log(err);
            // });
}

// Function call to initialize app
licenseInfo();
init();
