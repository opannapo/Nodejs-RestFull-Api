var JWT = require('../../../helper/JWT.js');
var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);
		if (validate(req, res)) {
			reqParam = {
				username: req.body.username,
				password: req.body.password,
			}

			var q1 = 'SELECT ID,UserName FROM User WHERE UserName="' + reqParam.username + '" AND Password="' + C.md5(reqParam.password) + '"';
			C.mysqlCon.query(q1, function (err, rows) {
				console.log(q1);

				if (!err && rows[0] != null) {
					console.log('--- rows[0] ---');
					console.log(rows[0]);
					console.log(rows.length);

					var id=rows[0].ID; 
					var jwt = JWT.create(id);
					user = {
						id: id,
						token: jwt
					}

					C.successResponse.generate(req, res, user);
				} else {
					console.log(err);
					C.errorResponse.generate(req, res, C.errorCodes('User').DATA_NOT_FOUND);
				}
			});
		}
	}
};


function validate(req, res) {
	if (!req.body.username) {
		C.errorResponse.generate(req, res, C.errorCodes('Username').INVALID_PARAMETER);
		return false;
	}
	if (!req.body.password) {
		C.errorResponse.generate(req, res, C.errorCodes('Password').INVALID_PARAMETER);
		return false;
	}

	return true;

}
