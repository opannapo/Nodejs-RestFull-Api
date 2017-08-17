var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);
		if (validate(req, res)) {
			var param1 = req.param('param1');
			var param2 = req.param('param2');
			var data = {
				"param1": param1,
				"param2": param2
			}
			C.successResponse.generate(req, res, data);
		} else {
			console.log(err);
			C.errorResponse.generate(req, res, C.errorCodes().DATA_NOT_FOUND);
		}
	}
};


function validate(req, res) {
	if (!req.param('param1')) {
		C.errorResponse.generate(req, res, C.errorCodes('Param1').INVALID_PARAMETER);
		return false;
	}
	if (!req.param('param2')) {
		C.errorResponse.generate(req, res, C.errorCodes('Param2').INVALID_PARAMETER);
		return false;
	}

	return true;
}
