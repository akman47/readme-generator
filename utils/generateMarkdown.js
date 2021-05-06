// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return "";
  }
  // add license badge to top of readme
  return `
  
  `;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return "";
  }

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

          ## Description
          ${data.description}

          ## Table of Contents
          - [Installation](#installation)
          - [Usage](#usage)
          - [License](#license)
          - [Contributing](#contributing)
          - [Tests](#tests)
          - [Questions](#questions)

          ## Installation
          ${data.installation}

          ## Usage
          ${data.usage}

          ## License
          This application is covered under ${data.license}

          ## Contributing
          ${data.contribution}

          ## Tests
          ${data.tests}

          ## Questions
          If you have any questions, email the developer at ${data.email} or visit their [GitHub profile](https://github.com/${data.github})
`;
}

module.exports = generateMarkdown;
