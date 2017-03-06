var mysql = require('mysql');
var http = require('http');

var enviroment = {
	Dbconnection : mysql.createPool({
			database : 'todo',
		    user : 'ftdev',
			password : '10gXWOqeaf',
		    host :'apps.fountaintechies.com',
	}),

}
module.exports = enviroment;