// creates license badge if license is chosen
const addLicenseBadge = license => {
  if (license) {
      return `![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-blue)
`;
  } else {
      return '';
  }
};


// creates description section
const createDescription = (title, description, link) => {
  if (link) {
      return `${description} 
      
      Click the link for deployed page [${title}](${link}).`;
  } else {
      return `${description}`;
  }
};


// creates table of contents
const createTableOfContents = contentsArr => {


  // creates contents list items based on user selection
  let contentsList = '';
  contentsArr.forEach((item) => {


      // indents 'Screenshots' list item
      if (item.content && item.header === 'Screenshots') {
      contentsList += `   * [${item.header}](#${(item.header).toLowerCase()})
`;
      } else if (item.content) {
          contentsList += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
`;
      }
  });
  return contentsList;
};


// creates installation section
const createInstallation = install => {
  if (install) {
      return `This application needs to install: 
\`\`\`
${install}
\`\`\``
  } else {
      return '';
  }
};


// creates screenshot section
const createScreenshots = screenshotItem => {
  let allScreenshots = '';
  if (screenshotItem) {
      screenshotItem.forEach(shot => {
      allScreenshots += `![${shot.screenshotAlt}](${shot.screenshotLink})
${shot.screenshotDesc}
`;
  });


  return `${allScreenshots}`;
  } else {
      return `![${shot.screenshotAlt}](${shot.screenshotLink})`;
  }
};


// creates languages section
const createLanguages = lang =>{
  let allTechnologies = '';
  if (lang) {
      lang.forEach(item => {
          allTechnologies += `* ${item}`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};


// creates usage section
const createUsage = (usage, screenshots) => {
  return `${usage} ${createScreenshots(screenshots)}`
};


// creates license section
const createLicense = license => {
  if (license) {
      return `This application is covered under ${license}.`;
  } else {
      return '';
  }
};


const createTest = test => {
  if (test) {
      return `To run tests on the application, install
\`\`\`
${test}
\`\`\`
and run \`npm run test\` from the command line.`
  } else {
      return '';
  };
};


// creates questions section
const createQuestions = (email, github) => {
  if (email) {
      return `Created by ${github}. 
      If you have any questions about this repo, please contact me at ${email}.`
  } else {
      return '';
  }
};


// creates credits section
const createCredits = creditItem => {
  let allCredits = '';
  if (creditItem) {
      creditItem.forEach((credit) => {
      allCredits += `* [${credit.creditName}](${credit.creditLink})
`;
      });


      return allCredits;
  } else {
      return '';
  }
};


// function to generate markdown for README
function generateMarkdown(data) {
  const { title, github, repo, license } = data;
  let readmeContents = '';
  const sectionArr = [
      {
          header: 'Installation',
          content: createInstallation(data.installation)
      },
      {
          header: 'Usage',
          content: createUsage(data.usage)
      },
      {
          header: 'Screenshots',
          content: createScreenshots(data.screenshots)
      },
      {
          header: 'Languages',
          content: createLanguages(data['languages'])
      },
      {
          header: 'Contributing', 
          content: data.contributing 
      },
      {
          header: 'Credits',
          content: createCredits(data.credits)
      },
      {
          header: 'Tests',
          content: createTest(data.tests)
      },
      {
          header: 'Questions',
          content: createQuestions(data.questions, github)
      },
      {
          header: 'License',
          content: createLicense(license)
      },
  ];


  // adds each README section if contents for the section exists
  sectionArr.forEach((sectionItem) => {
      if (sectionItem.content && sectionItem.header === 'Screenshots') {
          readmeContents += `### ${sectionItem.header}
${sectionItem.content}

`
      } else if (sectionItem.content) {
      readmeContents += `## ${sectionItem.header}
${sectionItem.content}
  
`;
      }
  });


  return `# ${title}
[![Issues](https://img.shields.io/github/issues/${github}/${
  repo
})](https://github.com/${github}/${
  repo
}/issues) [![Issues](https://img.shields.io/github/contributors/${
  github
}/${repo})](https://github.com/${github}/${
  repo
}/graphs/contributors) ${addLicenseBadge(license)}

## Description
${createDescription(title, data.description, data.link)}

## Contents
${createTableOfContents(sectionArr)}

${readmeContents}`;
}


module.exports = generateMarkdown;

