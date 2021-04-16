// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the Project Title?  (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please provide a project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your github username? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'What is your Repo name?  (Required)',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please enter your repo!')
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Add a description to your project?  (Required)',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information for the application!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Follow instructions to add sections to your README.',
        choices: [
            {
                name: 'Deployed URL',
                checked: true
            },
            {
                name: 'Installation',
                checked: true
            },
            {
                name: 'Screenshots',
                checked: true
            },
            {
                name: 'Usage',
                checked: false
            },
            {
                name: 'License',
                checked: true
            },
            {
                name: 'Contributing',
                checked: true
            },
            {
                name: 'Tests',
                checked: true
            },
            {
                name: 'Questions',
                checked: true
            },
            {
                name: 'Credits',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        name: 'link',
        message: 'Add the deployed url.',
        when: ({ contents }) => {
            if (contents.indexOf('Link') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please enter a link!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Add any required packages for the installation.',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide license information.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license information!');
                return false;
            }
        }
    }, 
    {
        type: 'checkbox',
        name: 'languages',
        message: 'Please add any languages used.',
        choices: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'SQL'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Languages') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, 
    {
        type: 'input',
        name: 'contributing',
        message: 'Any guidelines for contributing section?',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please enter guidelines for contributing!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Add any test steps for the application. (Optional)',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please add tests and how to run them.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'What email to reach you?',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please enter email!');
                return false;
            }
        }
    }
];


// array of prompts for adding screenshots
const screenshotQues = [
    {
        type: 'input',
        name: 'screenshotLink',
        message: 'Add link for your screenshot. (Required)',
        validate: screenshotLinkInput => {
            if (screenshotLinkInput) {
                return true;
            } else {
                console.log('Please provide a link for your screenshot!')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'screenshotAlt',
        message: 'Add alt text for your screenshot. (Required)',
        validate: screenshotAltInput => {
            if (screenshotAltInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'screenshotDesc',
        message: 'Add a description of your screenshot. (Optional)'
    },
    {
        type: 'confirm',
        name: 'confirmAddScreenshot',
        message: 'Add another screenshot?',
        default: false
    }
];


// array of prompts for adding credits
const creditQues = [
    {
        type: 'input',
        name: 'creditName',
        message: 'Add a credit name (1st of 2 parts). (Required)',
        validate: creditName => {
            if (creditName) {
                return true;
            } else {
                console.log('Please enter a credit name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditLink',
        message: 'Please provide a link for the credit.  (Required)',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Enter a link for the credit!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddCredit',
        message: 'Add another credit?',
        default: false
    }
]


// recursive function for adding screenshots
addScreenshots = readmeData => {
    
    // initiates screenshot array
    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }


    console.log(`
==============
Add Screenshot
==============
    `);
    return inquirer.prompt(screenshotQues)
    .then(screenshotData => {


        // adds the screenshot to the array
        readmeData.screenshots.push(screenshotData);


        // will call addScreenshots again based on user input
        if (screenshotData.confirmAddScreenshot) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
};


// recursive function for adding credits
addCredits = readmeInfo => {
    
    // initiates array for credits
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };


    console.log(`
==========
Add Credit
==========
    `);


    return inquirer.prompt(creditQues)
    .then(creditData => {


        // adds credits to array
        readmeInfo.credits.push(creditData);


        // will call addCredits again based on user input
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
    });
};


// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README file created!')
    });
};


// function to initialize program
function init() {
    return inquirer.prompt(questions);
};


// function call to initialize program
init()
    .then(userResponse => { 
        // calls function to add screenshots based on user selection
        if (userResponse.contents.indexOf('Screenshots') > -1) {
            return addScreenshots(userResponse);
        } else {
            return userResponse;
        }
    })
    .then(response => {
        // calls function to add credits based on user selection
        if (response.contents.indexOf('Credits') > -1) {
            return addCredits(response);
        } else {
            return response;
        }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
