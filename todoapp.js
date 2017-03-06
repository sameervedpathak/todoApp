require('use-strict');
var connect = require('connect');
var app = connect();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var CRUD = require('mysql-crud');
var http = require('http');
var express = require('express');
var mysql = require('mysql');
var env = require('./api/enviroment.js');
var connection = env.Dbconnection;
var TodoCRUD = CRUD(connection, 'student');

var app = express();

var mobile = connect();

mobile.use(serveStatic('mobile/www'));
app.use('/mobile',mobile);

// handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.json({ type: 'application/*+json' }));


app.get('/api/getallstudentlist' , function(req,res){
	TodoCRUD.load({},function(err,result){
		if(!err){
			res.jsonp(result);
		}else{
			console.log("error");
		}
		
	})
});

app.listen(2000);
console.log("server running on port 2000");
