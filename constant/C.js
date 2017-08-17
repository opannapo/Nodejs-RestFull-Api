const subApp			=	require('../app.js');  
const errorResponse 	=	require('../routes/response/error.js');  
const successResponse 	=	require('../routes/response/response.js');  
const errorCodes 		=	require('./ErrorCodes.js');
const options 			= 	{
							  inflate: true,
							  limit: '100kb',
							  type: 'application/octet-stream'
							}; 
const multiParty 		= 	require('multiparty');
const urlEncBodyParser	=	require('body-parser').urlencoded({ extended: true }); // ini buat application/x-www-form-urlencoded parser,
const generalBodyParser	=	require('body-parser');// ini buat general parser,
const rawBodyParser		=	require('body-parser').raw(options); // ini buat raw,
const jsonBodyParser 	=	require('body-parser').json();// ini buat json,
const path 				=  	require('path');
const fs 				= 	require('fs'); 
const fse 				= 	require('fs-extra');
const md5 				= 	require('md5'); 
const mysql 			=   require('mysql');
const mysqlCon 			=   mysql.createConnection({
							  host: "localhost",
							  user: "root",
							  password: "",
							  database: "myDb"
						    });    
 
module.exports={
	App					: 	subApp.app,
	errorResponse		: 	errorResponse,
	successResponse 	: 	successResponse,
	generalBodyParser	: 	generalBodyParser,
	urlEncBodyParser 	: 	urlEncBodyParser,
	rawBodyParser		: 	rawBodyParser,
	jsonBodyParser		: 	jsonBodyParser, 
	path 				: 	path,
	fs 					: 	fs,
	fse 				:  	fse,
	md5 				: 	md5,
	mysql 				: 	mysql,
	mysqlCon 			: 	mysqlCon,
	multiParty			:	multiParty, 
	errorCodes			: 	errorCodes
}


