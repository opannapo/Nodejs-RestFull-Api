var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);

		var raw = '';
		req.setEncoding('utf8');
		req.on('data', function (chunk) {
			raw += chunk;
		});
		req.on('end', function () {
			req.body = raw;
			console.log("raw " + raw);

			if (raw == '') {
				C.errorResponse.generate(req, res, C.errorCodes('raw').INVALID_PARAMETER);
			} else {
				if (validate(req, res, raw)) {
					var data = {
						"raw": JSON.parse(raw)
					}
					C.successResponse.generate(req, res, data);
				}
			}
		});
	}
};


function validate(req, res, raw) {
	try {
		if (!JSON.parse(raw)) {
			C.errorResponse.generate(req, res, C.errorCodes('raw').INVALID_PARAMETER);
			return false;
		}
	} catch (e) {
		C.errorResponse.generate(req, res, C.errorCodes('data').INVALID_FORMAT);
		return false;
	}
	
	return true; 
}
