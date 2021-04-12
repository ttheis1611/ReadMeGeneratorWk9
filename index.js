// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generatePage = require('./utils/genMarkdown.md');
const { writeFile, copyFile } = require('./utils/generateFile.js');

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
            return writeFile(pageMarkdown);
        })
        .catch(err => {
            console.log(err);
        })
};

// Function call to initialize app
init();
