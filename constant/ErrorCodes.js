module.exports = function (param) {
	var module = {};

	if (param == null) {
		param = '';
	}

	//TOKEN 1xx
	module.TOKEN_INVALID = { internalCode: 101, key: 'token', text: 'Ivalid Token ' + param };
	module.TOKEN_EXPIRED = { internalCode: 102, key: 'token', text: 'Token Expired ' + param };
	module.TOKEN_UNAUTHORIZED = { internalCode: 103, key: 'token', text: 'Request Unauthorized ' + param };
	//DATA 2XX	
	module.DATA_NOT_FOUND = { internalCode: 201, key: 'data', text: param + 'Not Found' };
	module.DATA_DUPLICATE = { internalCode: 202, key: 'data', text: param };
	//REQUEST 3XX	
	module.INVALID_URL = { internalCode: 300, key: 'url', text: param + 'Url not found' };
	module.INVALID_PARAMETER = { internalCode: 301, key: 'parameters', text: 'Invalid Request Parameters ' + param };
	module.OPERATION_FAILED = { internalCode: 302, key: 'operation', text: param + 'Failed' };



	return module;
}


