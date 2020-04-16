// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
  constructor(officeNumber) {
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    return inquirer.prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "What is your Office Phone Number?",
      },
    ]);
  }
}
module.exports = Manager;
