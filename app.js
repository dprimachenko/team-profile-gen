const inquirer = require('inquirer');
let fs = require("fs");
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");

let teams = [];

function init() {
	inquirer
	  	.prompt([{
	  		name: 'managerName',
	  		message: "What is your manager's name?"
	  	},{
	  		name: 'id',
	  		message: "What is your manager's ID?"
	  	},{
	  		name: 'email',
	  		message: "What is your manager's email?"
	  	},{
	  		name: 'officeNumber',
	  		message: "What is your manager's office number?"
	  	}])
	  	.then((answers) => {
	  		let manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
	  		console.log(manager);
	  		teams.push(manager);
	  		employeePrompt();
	  	});
}

function engineerPrompt() {
	inquirer
		.prompt([{
			name: 'engineerName',
	  		message: "What is your engineer's name?"
	  	},{
	  		name: 'id',
	  		message: "What is your engineer's ID?"
	  	},{
	  		name: 'email',
	  		message: "What is your engineer's email?"
	  	},{
	  		name: 'gitHub',
	  		message: "What is your engineer's GitHub account?" 
		}])
		.then((answers) => {
	  		let engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.gitHub);
	  		teams.push(engineer);
	  		console.log(teams);
	  		employeePrompt();
	  	});
}

function internPrompt() {
	inquirer
		.prompt([{
			name: 'internName',
	  		message: "What is your intern's name?"
	  	},{
	  		name: 'id',
	  		message: "What is your intern's ID?"
	  	},{
	  		name: 'email',
	  		message: "What is your intern's email?"
	  	},{
	  		name: 'school',
	  		message: "What is your intern's school?" 
		}])
		.then((answers) => {
	  		let intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
	  		teams.push(intern);
	  		console.log(teams);
	  		employeePrompt();
	  	});
}

function employeePrompt() {
	inquirer
		.prompt([{
			name: 'employee',
			type: 'list',
			message: "Select an employee to add to your team",
			choices: [
				"Engineer",
				"Intern",
				"I am done adding team members"
			]
		}])
		.then((answer) => {
			if (answer.employee == "Engineer") {
				engineerPrompt();
			}
			else if (answer.employee == "Intern") {
				internPrompt();
			}
			else {
				console.log("team is complete with "+teams.length+ " members!")
				fs.writeFile('output.html', generateHTML(teams), (err) => {
				    // throws an error, you could also catch it here
				    if (err) throw err;
				    // success case, the file was saved
				    console.log('Teams saved to output.html!');
				});
			}
		});
}
function generateHTML(data) {
	console.log(data);
  	return `<!DOCTYPE html>
<html>
<head>
	<title>My Team</title>
	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
</head>
<body>
	<header class="jumbotron bg-danger" style="color: white; text-align: center;">
      <h1 class="display-3"><strong>My Team</strong></h1>
    </header>
    <div class="container">
    	<div class="jumbotron jumbotron-center">
    		<div class="row justify-content-center" id="start">
    		</row>
    	</div>
    </div>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script type="text/javascript">
    	let teams = ${ JSON.stringify( data ) };
    	teams.forEach(function(res){
    		if (res.title == 'Manager') {
    			$("#start").append('<div class="col-md-4"> <div class="card bg-light shadow-lg mb-5 rounded" style="width: 18rem;"> <div class="card-header bg-primary text-white"> <h2 class="card-title" id="card">'+res.name+'</h2> <h3><i class="fas fa-mug-hot"></i> Manager</h3> </div> <div class="card-body"> <ul class="list-group list-group-flush border"> <li class="list-group-item">ID: '+res.id+'</li> <li class="list-group-item">Email: <a href="#" id="email">'+res.email+'</a></li> <li class="list-group-item">Office Number: '+res.officeNumber+'</li> </ul> </div> </div> </div>'); }
    		else if(res.title == 'Engineer') {
    			$("#start").append('<div class="col-md-4"> <div class="card bg-light shadow-lg mb-5 rounded" style="width: 18rem;"> <div class="card-header bg-primary text-white"> <h2 class="card-title" id="card">'+res.name+'</h2> <h3><i class="fas fa-glasses"></i> Engineer</h3> </div> <div class="card-body"> <ul class="list-group list-group-flush border"> <li class="list-group-item">ID: '+res.id+'</li> <li class="list-group-item">Email: <a href="#" id="email">'+res.email+'</a></li> <li class="list-group-item">GitHub: <a href="#" id="git">'+res.github+'</a></li> </ul> </div> </div> </div>'); }
    		else if(res.title == 'Intern') {
    			$("#start").append('<div class="col-md-4"> <div class="card bg-light shadow-lg mb-5 rounded" style="width: 18rem;"> <div class="card-header bg-primary text-white"> <h2 class="card-title" id="card">'+res.name+'</h2> <h3><i class="fas fa-user-graduate"></i> Intern</h3> </div> <div class="card-body"> <ul class="list-group list-group-flush border"> <li class="list-group-item">ID: '+res.id+'</li> <li class="list-group-item">Email: <a href="#" id="email">'+res.email+'</a></li> <li class="list-group-item">School: '+res.school+'</li> </ul> </div> </div> </div>'); }
    	});
    </script>
</body>
</html>`
}

init();