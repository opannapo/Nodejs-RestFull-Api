var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		C.errorResponse.generate(req, res, C.errorCodes().INVALID_URL);
	}
};