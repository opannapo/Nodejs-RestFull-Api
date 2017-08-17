//APP
var express 	= require('express');
var app 		= express();    

//MODULE EXPORTS
module.exports={app:app}    

//HANDLE REQUEST	 
require('./routes/index.js');

//HANDLE REQUEST DEFAULT
app.get('*', function(req, res) {
    require('./routes/default/invalid/exe.js').exe(req,res);
});
app.post('*', function(req, res) {
    require('./routes/default/invalid/exe.js').exe(req,res);
});    

//START SERVER
app.listen(8819, function () {
	console.log('listening on port 8819!');   
});