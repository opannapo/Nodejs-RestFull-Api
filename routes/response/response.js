module.exports = {
	generate: function (req, res, data) {
		var result = {
			success: true,
			data: data,
			error: null
		};
		res.contentType('application/json');
		res.send(JSON.stringify(result));
	}
};