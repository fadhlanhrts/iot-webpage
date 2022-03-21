var pg = require("pg");
var connectionString = {
    user: 'postgres',
    host: 'localhost',
    database: 'flask_db',
    password: 'harits2804',
    port: 5432,
  };
const express = require('express');
const session = require('express-session');
const path = require('path');
const pgcon = new pg.Client(connectionString)
const app = express()

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
    pgcon.connect()

	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password

        console.log(username)
        console.log(password)
    
        pgcon.query("SELECT * FROM user_db WHERE username='" + username + "' AND password = '" + password + "'", (err, res) => {
                
                if (res.rowCount > 0) {
				// Authenticate the user
				    request.session.loggedin = true;
				    request.session.username = username;
				// Redirect to home page
				    response.redirect('/home');
			    } else {
				    response.send('Incorrect Username and/or Password!');
			    }			
			    //response.end();
        })
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
        //response.redirect('/dht');
        response.sendFile(path.join(__dirname + '/index.html'));
		//response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	//response.end();
});

app.listen(3000);