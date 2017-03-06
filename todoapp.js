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

var web = connect();
var mobile = connect();


// handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

web.use(serveStatic('web'));
app.use('/',web);

mobile.use(serveStatic('mobile/www'));
app.use('/mobile',mobile);


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

app.post('/api/Updatestudent' , function(req,res){
	console.log("req.body:",req.body);

	TodoCRUD.update({
		'id' : req.body.id
	},{
		'name' :req.body.name,
		'age' : req.body.age
	},function(err,result){
		if(!err){
			var responsedata = {
                status: true,
                record: result,
                message: 'data updated successfully'
            };
            
		}else{
			var responsedata = {
                status: false,
                message: 'failed to update'
            };
		}
		res.jsonp(responsedata);
	});
});

app.get('/api/deletestudent/:id',function(req,res){
	console.log(req.params);
	TodoCRUD.destroy({'id' : req.params.id},function(err,result){
		if(!err){
			var responsedata = {
                status: true,
                message: 'record deleted'
            };
			
		}else{
			console.log("Error in deletestudent api");
			var responsedata = {
                status: false,
                message: 'record failed to delete'
            };
		}
		res.jsonp(responsedata);
	})
})

app.listen(5000);
console.log("server running on port 5000");
