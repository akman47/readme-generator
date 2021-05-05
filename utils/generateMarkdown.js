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
          ${data.tableOfContents}

          ## Installation
          ${data.installation}

          ## Usage
          ${data.usage}

          ## License

          ## Contributing

          ## Tests

          ## Questions
          Visit my GitHub profile for more information: ${gitHubLink}
          You can reach me at ${email} with any additional questions

`;
}

module.exports = generateMarkdown;
