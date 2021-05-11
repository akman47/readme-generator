// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const fetch = require("node-fetch");
const { renderLicenseBadge, renderLicenseLink, generateMarkdown } = require("./utils/generateMarkdown.js");
var licenseData = "";

// TODO: Create an array of questions for user input
const questions = [ 
    {
        inputName: "github",
        inputMessage: " What is your GitHub username?"
    },
    {
        inputName: "email",
        inputMessage: "What is your email address?"
    },
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
        inputMessage: "Provide guidelines to how other developers can contribute to this project."
    },
    {
        inputName: "tests",
        inputMessage: "Provide tests for the application and examples on how to run them."
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
            
                    // add license to input array
                    promptInput.push(licensePrompt);
                    //console.log(licenseData);

                    init();
                })
            }
        })
}

// get license info
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
                message: "New " + fileName + " README.md has been successfully created!"
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
            .then(answers => {
                getLicenseSpdx(answers);
                return writeToFile(answers.title, answers);
                //console.log(answers);
            })
            .catch(err => {
                console.log(err);
            });
}

// Function call to initialize app
licenseList();
//init();

