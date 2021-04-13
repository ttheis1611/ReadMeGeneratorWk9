// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Create an array of questions for user input
const promptQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is your Project Title? (Required)',
            validate: titleInput => {
                if(titleInput) {
                    return true;
                } else {
                    console.log('Please enter Project Title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please describe your Project: (Required)',
            validate: describeInput => {
                if(describeInput) {
                    return true;
                } else{
                    console.log('Please enter description of Project!')
                }
            }
        },
        {
            type: 'input',
            name: 'tableOfContents',
            message: 'Please select Table of Contents Project: (Optional)',
            validate: describeInput => {
                if(describeInput) {
                    return true;
                } else {
                    console.log('None!')
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please any installation for your Project: (Required)',
            validate: installationInput => {
                if(installationInput) {
                    return true;
                } else {
                    console.log('Please installation requirements!')
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please add usage for your Project: (Required)',
            validate: usageInput => {
                if(usageInput) {
                    return true;
                } else {
                    console.log('Please enter usage of the Project!')
                }
            }
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Please credits to your Project: (Required)',
            validate: creditInput => {
                if(creditInput) {
                    return true;
                } else {
                    console.log('Please enter Credits!')
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please provide license information.',
            choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
            default: 0,
            // when: ({ contents }) => {
            //     if (contents.indexOf('License') > -1) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // },
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
            type: 'input',
            name: 'badges',
            message: 'Any badges for your Project?: (Required)',
            validate: badgeInput => {
                if(badgeInput) {
                    return true;
                } else {
                    console.log('Please enter a badge for the Project!')
                }
            }
        },
        {
            type: 'input',
            name: 'features',
            message: 'Please input any features: (Required)',
            validate: featureInput => {
                if(featureInput) {
                    return true;
                } else {
                    console.log('Please enter features for the Project!')
                }
            }
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Please enter contributors to the Project: (Required)',
            validate: contributeInput => {
                if(contributeInput) {
                    return true;
                } else {
                    console.log('Please Contributors!')
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Input any tests (N/A for None): (Required)',
            validate: testInput => {
                if(testInput) {
                    return true;
                } else {
                    console.log('Please enter something for tests!')
                }
            }
        }
    ])
};
        

// Create a function to initialize app
function init() {
    promptQuestions()

        // Create a function to write README file
        .then(data => {
            return generateMarkdown(data);
        })
        .then(pageMarkdown => {
            console.log(pageMarkdown);
            fs.writeFile('ReadMe.md', pageMarkdown, err => {
                if (err) throw err;

                console.log('Portfolio complete! Check out ReadMe.md to see the output!');
            });
        })
        .catch(err => {
            console.log(err);
        })
};

// Function call to initialize app
init();
