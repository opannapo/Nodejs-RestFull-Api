var C = require('../../constant/ErrorCodes.js');

module.exports = {
	generate: function (req, res, error) {
		var result = {
			success: false,
			data: null,
			error: error
		};
		res.contentType('application/json');
		res.send(JSON.stringify(result));
	}
};