const inquirer = require('inquirer');

const {
  runner,
  SetUserRole
} = require('../server/dist/scripts');

const {
  UserRole
} = require('../server/dist/components')

async function main() {

  const questions = [];

  questions.push({
    type: 'input',
    name: 'username',
    message: 'Provide an username',
    default: 'john.smith'
  });

  questions.push({
    type: 'list',
    name: 'role',
    message: 'Choose an user role',
    choices: Object.values(UserRole)
  });

  const answers = await inquirer.prompt(questions);
  await runner(SetUserRole, answers);
}

if (require.main === module) {
  main()
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
