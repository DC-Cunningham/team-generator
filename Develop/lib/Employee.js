// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
    ]);
  }
  getId() {
    return inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is your ID Number?",
      },
    ]);
  }
  getEmail() {
    return inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
    ]);
  }
  getRole() {
    return inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ]);
  }
}
