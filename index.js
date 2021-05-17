// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const fetch = require("node-fetch");
const generateMarkdown = require("./utils/generateMarkdown.js");
var licenseData = "";

// TODO: Create an array of questions for user input
const questions = [ 
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?",
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("Please enter your GitHub username.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?",
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("Please enter your email address.");
                return false;
            }
        }
    },
    { 
        type: "input",
        name: "title",
        message: "What is your project's name?",
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("Please provide the project's title.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Provide a description of the project.",
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("Please enter a short description about the project.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "installation",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "tests",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?",
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("Please enter usage information about the project.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "contributing",
        message: "Provide guidelines for how other developers can contribute to this project.",
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("Please enter contributing information about the project.");
                return false;
            }
        }
    }
];

// gather all license types for list choices
const licenseList = () => {
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

                    // save license data to access later
                    licenseData = data;
            
                    // add license prompt to inputPrompt array
                    questions.push(licensePrompt);

                    init();
                })
            }
        })
}

// get license spdx id to render license badge and url
const getLicenseSpdx = userInput => {
    for (let i = 0; i < licenseData.length; i++) {
        if (userInput.license === licenseData[i].name) {
            let licenseId = licenseData[i].spdx_id;
            userInput.license = licenseId;
            return userInput;
        }
    }
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName + "_README.md", generateMarkdown(data), err => {
            if (err) {
                reject(err);
                return;
            }
            resolve ({
                ok: true,
                message: "New " + fileName + "_README.md has been successfully created!"
            });
        });
    });
}

// TODO: Create a function to initialize app
function init() {
    console.log(
        `
        ====================================
          Provide details for a new README
        ====================================
        `
    );
    // start question prompt
    return inquirer.prompt(questions)
            .then(answers => {
                getLicenseSpdx(answers);
                return writeToFile(answers.title, answers);
            })
            .then(writeToFileResponse => {
                console.log(writeToFileResponse.message);
            })
            .catch(err => {
                console.log(err);
            });
}

// Function call to initialize app
licenseList();
//init();