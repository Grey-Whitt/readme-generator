const inquirer = require('inquirer')
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
        choices: ['MIT', 'GNU GPLv3', '(Other/No License)']
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
        name: 'Contribution',
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
        name: 'Test',
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
        name: 'confirmQuest',
        message: 'Would you like to tell people how to reach out to you for questions, comments or anything else?'
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Enter your GitHub Username and or email so people can reach out:',
        when: ({ confirmQuest }) => {
            if (confirmQuest) {
              return true;
            } else {
              return false;
            }
        }
    }

];

// function to write README file
const writeToFile = (fileName, data) => {
}

// function to initialize program
const init = () => {
    return inquirer.prompt(questions)
}

// function call to initialize program
init();
