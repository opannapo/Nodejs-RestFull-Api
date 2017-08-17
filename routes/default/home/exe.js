var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		var point=[
			"Express",
			"Clean code with a simple project structure",
			"Authorization",
			"JWT",
			"Urlencoded Body Parser", 
			"Multiparty",
			"Raw Body Parser",
			"File Upload",
			"Md5",
			"Mysql",
			"CRUD with Transaction"
		]
		var obj = {
			title: 'Welcome to opannapo.development.com',
			desc: "On this Example you can learn about Mmethod POST ",
			point: point 
		}

		C.successResponse.generate(req, res, obj);
	}
};