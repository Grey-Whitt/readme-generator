const inquirer = require('inquirer')
const generatePage = require('./utils/generateMarkdown');
const fs = require('fs')

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your projects title? (Required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter your projects title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of what your project is about (Required)',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please enter your projects description!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license would you like to use?',
        choices: ['MIT', 'GNU_GPLv3', '(Other/No License)']
    },
    {
        type: 'input',
        name: 'fullname',
        message: 'Enter your full name for the license',
    },
    {
        type: 'confirm',
        name: 'confirmInstallation',
        message: 'Would you like to explain how to install your program?',
        default: true
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How do you install your program?:',
        when: ({ confirmInstallation }) => {
            if (confirmInstallation) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmUsage',
        message: 'Would you like to explain how to use your program?',
        default: true
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Explain how to use the application',
        when: ({ confirmUsage }) => {
            if (confirmUsage) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmCont',
        message: 'Would you like to tell other developers how to contribute to your project?'
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'How can other developers contribute?',
        when: ({ confirmCont }) => {
            if (confirmCont) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Would you like to explain how to test your program?'
    },
    {
        type: 'input',
        name: 'test',
        message: 'How can other people test your program?',
        when: ({ confirmTest }) => {
            if (confirmTest) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmResources',
        message: 'Would you like to credit anyone or any resources'
    },
    {
        type: 'input',
        name: 'resources',
        message: 'cite your resources:',
        when: ({ confirmResources }) => {
            if (confirmResources) {
                return true;
            } else {
                return false;
            }
        }
    }
];

const promptContact = qData => {
    if (!qData.contactInfo) {
        qData.contactInfo = [];
    }

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmQuest',
            message: 'Would you like to tell people how to reach out to you for questions, comments or anything else?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username:',
            when: ({ confirmQuest }) => {
                if (confirmQuest) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmEmail',
            message: 'Would you like to enter your email as well?',
            when: ({ confirmQuest }) => {
                if (confirmQuest) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your Email:',
            when: ({ confirmEmail }) => {
                if (confirmEmail) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
        .then(contactData => {
            qData.contactInfo.push(contactData);

            return qData;

        });
}

// function to write README file
const writeToFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', data, err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method

            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });


        });
    });
}

// function to initialize program
const init = () => {
    return inquirer.prompt(questions)
}

//function call to initialize program
init()
    .then(promptContact)
    .then(data => {
        return generatePage(data)
    })
    .then(data => {
        console.log('Done!')
        return writeToFile(data.trim())
    })
    .catch(err => {
        console.log(err);
    });



