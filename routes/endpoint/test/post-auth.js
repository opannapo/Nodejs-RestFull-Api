var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);
		if (validate(req, res)) {
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
		} else {
			console.log(err);
			C.errorResponse.generate(req, res, C.errorCodes().DATA_NOT_FOUND);
		}
	}
};


function validate(req, res) {
	if (!req.body.param1) {
		C.errorResponse.generate(req, res, C.errorCodes('param1').INVALID_PARAMETER);
		return false;
	}
	if (!req.body.param2) {
		C.errorResponse.generate(req, res, C.errorCodes('param2').INVALID_PARAMETER);
		return false;
	}

	return true;

}
