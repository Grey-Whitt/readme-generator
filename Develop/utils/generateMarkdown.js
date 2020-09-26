const moment = require('moment')

const year = moment().format('YYYY')



// function to generate markdown for README
function generateMarkdown(data) {
  let {fullname, license, confirmInstallation, installation, confirmUsage, usage, confirmCont, contribution, confirmTest, test, confirmResources, resources} = data
  let {confirmQuest, github, confirmEmail, email} = data.contactInfo
  
  const newData = {
    title: data.title,
    description: data.description,
    license: '',
    installation: '',
    usage: '',
    contribution: '',
    test: '',
    resources: '',
    github: '',
    email: '',
    contact: '',
    licenseSection: '',
    fullname: data.fullname,
    table: ''
  }

  if (license === '(Other/No License)') {
    newData.license = '![License](https://img.shields.io/badge/-Contributor_Covenant-blueviolet)'
    newData.licenseSection = '[License](./contributor_covenant.md)'
  } else if (license === 'MIT') {
    newData.license = `![license](https://img.shields.io/badge/License-MIT-brightgreen)`
    newData.licenseSection = './LICENSE.txt'
  } else if (license === 'GNU_GPLv3'){
    newData.license = `![license](https://img.shields.io/badge/License-GNU_GPLv3-brightgreen)`
    newData.licenseSection = '[License](./COPYING.txt)'
  };

  if (confirmInstallation) {
    newData.installation = `## Installation 
    ${installation}`

    newData.table = newData.table + `* [Installation](#installation)\n`
  }

  if (confirmUsage) {
    newData.usage = `## How To Use
    ${usage}`

    newData.table = newData.table + `* [usage](#How)\n`
  }

  if (confirmCont) {
    newData.contribution = `## Contribution
    ${contribution}`

    newData.table = newData.table + `* [Contribution](#Contribution)\n`
  }

  if (confirmTest) {
    newData.test = `## Testing
    ${test}`
    newData.table = newData.table + `* [Testing](#Testing)\n`
  }

  if (confirmQuest) {
    newData.github = `https://github.com/${github}`
    if (confirmEmail) {
      newData.email = `${email}`
    }

    newData.contact = `## Contact Me With Any Questions, Comments or Anything else 
    ${newData.github}
    ${newData.email}`

    newData.table = newData.table + `* [Contact](#Contact)\n`
  }

  if (confirmResources) {
    newData.resources = `## Resources
    ${resources.split(' ').join(', ')}`
    newData.table = newData.table + `* [Resources](#Resources)\n`
  }



   
  return passedData(newData)
}

const passedData = (data) => {
  console.log(data)
  
  let {title, description, license, installation, usage, contribution, test, contact, resources, licenseSection, fullname, table} = data
  
  
  return`# ${title}
  ${license}

  ## Description
  ${description}

  ${table}

  ${installation}

  ${usage}

  ${contribution}

  ${test}

  ${contact}

  ${resources}

  ${licenseSection}

  ${fullname} ${year}`;
}

module.exports = generateMarkdown;
