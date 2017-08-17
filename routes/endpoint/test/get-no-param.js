var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url);
		var user=["Opan","napO","Taufan","Alfazri"];
		var data = {
			"url":req.url,
			"users": user
		}
		
		C.successResponse.generate(req, res, data);
	}
};
