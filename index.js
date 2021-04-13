// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
//const { writeFile, copyFile } = require('./utils/generateFile.js');

// TODO: Create an array of questions for user input
const promptQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is your repository name?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        }
    ])
};

// TODO: Create a function to initialize app
function init() {
    promptQuestions()

        // TODO: Create a function to write README file
        .then(data => {
            return generateMarkdown(data);
        })
        .then(pageMarkdown => {
            console.log(pageMarkdown);
            fs.writeFile('ReadMe.md', pageMarkdown, err => {
                if (err) throw err;

                console.log('Portfolio complete! Check out index.html to see the output!');
            });
        })
        .catch(err => {
            console.log(err);
        })
};

// Function call to initialize app
init();
