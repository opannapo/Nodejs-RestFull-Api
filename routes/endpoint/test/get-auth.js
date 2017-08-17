var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url);
		var user = {
			"name": "OpannapO",
			"city": "Jakarta",
			"skills": ["Java", "Android", "C#", ".NET", "PHP", "NODE.js"]
		}
		var data = {
			"auth": true,
			"url": req.url,
			user
		}

		C.successResponse.generate(req, res, data);
	}
};
