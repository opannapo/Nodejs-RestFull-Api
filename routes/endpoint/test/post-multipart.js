var util = require('util');
var C = require('../../../constant/C.js');
var openedFiles;
module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url);
		
		var form = new C.multiParty.Form();
		form.parse(req, function (err, fields, files) {
			if (fields['param1'] == null) {
				C.errorResponse.generate(req, res, C.errorCodes('param1').INVALID_PARAMETER);
				return;
			} else if (files['image'] == null) {
				C.errorResponse.generate(req, res, C.errorCodes('image').INVALID_PARAMETER);
				return;
			}

			var temp_path = files['image'][0].path;
			var file_name = Math.round(+new Date() / 1000) + '.jpg';
			var new_location = '/Users/opannapo/Documents/NTRIP-SOURCE-UPLOAD/' + file_name;

			C.fse.move(temp_path, new_location, function (err) {
				if (err) {
					console.error(err);
					C.errorResponse.generate(req, res, C.errorCodes('Move File').OPERATION_FAILED);
				} else {
					console.log("success!")
					var param = {
						"param1": fields['param1'],
						"image": files['image'][0],
					};
					var user = ["Opan", "napO", "Taufan", "Alfazri"];
					var data = {
						"url": req.url,
						"temp_path": temp_path,
						"file_name": file_name,
						"new_location": new_location,
						"users": user,
						"param": param
					}

					C.successResponse.generate(req, res, data);
				}
			});
		});
	}
}; 
