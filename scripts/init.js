const inquirer = require('inquirer');
const fs = require('fs');
const ora = require('ora');
const downloadLocal = require('../utils/downloadLocal');
const symbol = require('log-symbols');
const chalk = require('chalk');


const templateList = ['babel-webpack-typescript-lib']
let loading;

module.exports = function init(projectName) {
  if (!fs.existsSync(projectName)) {
    const commands = [{
        name: 'description',
        message: 'Please enter the project description: '
      },
      {
        name: 'author',
        message: 'Please enter the author name: '
      },
      {
        name: 'template',
        message: 'Please select a template: ',
        type: "list",
        choices: templateList
      }
    ]

    if (!projectName || projectName.length === 0) {
      commands.unshift({
        name: 'projectName',
        message: 'Please enter the project name: '
      }, )
    }

    inquirer.prompt(commands).then(async (answer) => {
      loading = ora('downloading template ...');
      loading.start();

      if (!projectName && answer.projectName.length === 0) {
        throw new Error('project name is null or undefined!!!');
      }

      console.error("projectName:", projectName, "answer.projectName:",answer.projectName)

      downloadLocal(answer.template, projectName || answer.projectName).then(() => {
        loading.succeed();
        const packageJsonPath = `${projectName}/package.json`;
        if (fs.existsSync(packageJsonPath)) {
          const data = fs.readFileSync(packageJsonPath).toString();
          let jsonData = JSON.parse(data);
          jsonData.name = projectName;
          jsonData.author = answer.author;
          jsonData.description = answer.description;
          fs.writeFileSync(packageJsonPath, JSON.stringify(jsonData, null, '\t'), 'utf-8');
          console.log(symbol.success, chalk.green('Project initialization finished!'));
        }
      }, (err) => {
        console.log(symbol.error, chalk.red(err));
        loading.fail();
      })
    }).catch(err => {
      console.log(symbol.error, chalk.red(err));
      loading.stop();
    })
  } else {
    console.log(symbol.error, chalk.red('The project already exists'))
  }
}