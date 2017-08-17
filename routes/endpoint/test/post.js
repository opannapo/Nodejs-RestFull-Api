var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);
		if (validate(req, res)) {
			var param1 = req.body.param1;
			var param2 = req.body.param2;
			var data = {
				"param1": param1,
				"param2": param2
			}
			C.successResponse.generate(req, res, data);
		} else { 
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
