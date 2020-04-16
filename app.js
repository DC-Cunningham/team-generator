const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

async function init() {
  const employeeArray = await buildUserList();
  const employeeClassArray = buildClassFromObject(employeeArray);
  const htmlData = render(employeeClassArray);
  outputFormattedDataToHTMLFile(htmlData);
}

async function buildUserList() {
  const memberArray = [];
  let addNewTeamMember = false;
  do {
    const { addMember: addMember } = await inquirer.prompt([
      {
        name: "addMember",
        type: "confirm",
        message: "Do you want to add a new team member",
      },
    ]);
    addNewTeamMember = addMember;
    if (addNewTeamMember) {
      const memberInformation = await inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "Please supply a name",
          when: memberArray.length === 0,
        },
        {
          name: "role",
          type: "list",
          message: "What role is this person in the team?",
          choices: ["Manager", "Engineer", "Intern"],
        },
        {
          name: "memberName",
          type: "input",
          message: "Please supply a name",
          when: memberArray.length !== 0,
        },
        {
          name: "id",
          type: "input",
          message: "Please supply a staff ID number",
        },
        {
          name: "email",
          type: "input",
          message: "Pease supply an email address",
        },
        {
          name: "officeNumber",
          type: "input",
          message: "What is your office number?",
          when: memberArray.length === 0,
        },
        {
          name: "github",
          type: "input",
          message: "What is the Engineer's github handle?",
          when: (answer) => answer.role === "Engineer",
        },
        {
          name: "school",
          type: "input",
          message: "What school does the intern attend?",
          when: (answer) => answer.role === "Intern",
        },
      ]);

      memberArray.push(memberInformation);
      console.log("Thanks");
    }
  } while (addNewTeamMember);

  console.log("Thanks for the info!");
  return memberArray;
}

function buildClassFromObject(memberArray) {
  return memberArray.map((member) => {
    if (member.role === "Manager") {
      const { name, id, email, officeNumber } = member;
      return new Manager(name, id, email, officeNumber);
    } else if (member.role === "Engineer") {
      const { name, id, email, github } = member;
      return new Engineer(name, id, email, github);
    } else if (member.role === "Intern") {
      const { name, id, email, school } = member;
      return new Intern(name, id, email, school);
    }
    console.log(memberArray);
  });
}

function outputFormattedDataToHTMLFile(htmlData) {
  fs.writeFileSync(outputPath, htmlData);
}

init();
