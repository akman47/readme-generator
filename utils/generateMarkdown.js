// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return "";
  }
  // add license badge to top of readme
  return `
    ${license.badge}
  `;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return "";
  }

  return `
  Please refer to ${license.link} for the full terms.
  `
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license) {
    return "";
  }

  return `
    ## License
    ${renderLicenseBadge}
    This application is licensed under the terms of the ${data.license} open source license.
    ${renderLicenseLink}
  `
}

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

          ${renderLicenseSection}

          ## Contributing
          ${data.contribution}

          ## Tests
          ${data.tests}

          ## Questions
          If you have any questions, email the developer at ${data.email} or visit their [GitHub profile](https://github.com/${data.github})
`;
}

module.exports = generateMarkdown;
