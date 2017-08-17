var JWT = require('../../../helper/JWT.js');
var C = require('../../../constant/C.js');

var dateNow = Math.floor(Date.now() / 1000);;
var sqlCon = C.mysqlCon;
var newUserId = 0;
var userLevel1Ids = [];

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);
		if (validate(req, res)) {

			var reqParam = {
				username: req.body.username,
				password: req.body.password,
				email: req.body.email
			}

			//every one must following user level 1 by default.
			var qUserLevel1 = 'SELECT ID from User where Level=' + 1;
			sqlCon.query(qUserLevel1, function (err, rows) {
				console.log(qUserLevel1);
				if (err) { showError(req, res, err); }

				if (rows != null) {
					var i = 0;
					for (i; i < rows.length; i++) {
						console.log(rows[i].ID);
						userLevel1Ids[i] = rows[i].ID;
						console.log(userLevel1Ids);
					}
				}

				sqlCon.beginTransaction(function (err) {
					if (err) {
						showError(req, res, err);
					}

					var q = 'INSERT INTO User SET '
						+ 'ID=0'
						+ ',UserName="' + reqParam.username + '"'
						+ ',FullName=""'
						+ ',Password="' + C.md5(reqParam.password) + '"'
						+ ',ShortDescription=""'
						+ ',Bio=""'
						+ ',Phone=""'
						+ ',Email="' + reqParam.email + '"'
						+ ',FollowerCount=' + 0
						+ ',FollowingCount=' + userLevel1Ids.length
						+ ',BestFriendCount=' + 0
						+ ',PostCount=' + 0
						+ ',ImageProfile=""'
						+ ',ImageCover=""'
						+ ',Latitude=' + 0
						+ ',Longitude=' + 0
						+ ',Address=""'
						+ ',ID_City=' + 0
						+ ',Interest=""'
						+ ',BirthDate=' + 0
						+ ',JoinDate=' + dateNow
						+ ',LastActive=' + dateNow
						+ ',LastUpdated=' + dateNow
						+ ',LastLogin=' + dateNow
						+ ',StatusActive=' + 1
						+ ',StatusLogin=' + 1
						+ ',Gender=""'
						+ ',Wesite=""';
					sqlCon.query(q, function (err, result) {
						console.log(q);
						if (err) {
							return sqlCon.rollback(function () {
								showError(req, res, err);
							});
						}

						newUserId = result.insertId;
						var q2 = 'INSERT INTO UserSettings SET '
							+ 'ID=0'
							+ ',ID_User="' + newUserId + '"'
							+ ',IsPublicAccount=' + 1
							+ ',Language=' + 1
							+ ',AllowFollowNotif=' + 1
							+ ',AllowTagNotif=' + 1
							+ ',AllowPublishFriend=' + 1
							+ ',AllowPublishFollowing=' + 1
							+ ',AllowPublishFollower=' + 1
							+ ',AllowPublishBirthDate=' + 1
							+ ',AllowPublishAddress=' + 1
							+ ',AllowPostOpenTrip=' + 0
							+ ',AllowPostShare=' + 0
							+ ',AllowPostOpenGuide=' + 0
							+ ',AllowPostOpenHouse=' + 0
							+ ',AllowPostHopes=' + 0
							+ ',AllowLoginSecure=' + 0
							+ ',AllowProfileEdit=' + 1
							+ ',LastUpdated=' + dateNow;
						sqlCon.query(q2, function (err, result) {
							console.log(q2);
							if (err) {
								return sqlCon.rollback(function () {
									showError(req, res, err);
								});
							}

							if (userLevel1Ids.length > 0) {
								var i = 0;
								var values = [];
								for (i; i < rows.length; i++) {
									console.log(rows[i].ID);
									var tmpUnique = C.md5(newUserId + '-' + rows[i].ID);
									values[i] = [0, newUserId, rows[i].ID, dateNow, 1, 0, 'Auto By System', tmpUnique];
									console.log(values);
								}

								var q3 = 'INSERT INTO RelationFollow(ID,FromUser_ID,ToUser_ID,Timestamp,Status,AllowRemove,Message,TmpUnique) VALUES ?';
								sqlCon.query(q3, [values], function (err, result) {
									console.log(q3);
									if (err) {
										return sqlCon.rollback(function () {
											showError(req, res, err);
										});
									}

									sqlCon.commit(function (err) {
										if (err) {
											return sqlCon.rollback(function () {
												showError(req, res, err);
											});
										}

										showSuccess(req, res);
									});
								});
							} else {
								sqlCon.commit(function (err) {
									if (err) {
										return sqlCon.rollback(function () {
											showError(req, res, err);
										});
									}

									showSuccess(req, res);
								});
							}
						});
					});
				});

			});
		}
	}
};

function showError(req, res, err) {
	console.log(err);
	console.log(err.code);
	console.log(err.message);

	var eText;
	if (err.code = 'ER_DUP_ENTRY') {
		if (err.message.indexOf('UNIQUE_EMAIL') > -1) {
			eText = C.errorCodes('Email Already exist').DATA_DUPLICATE;
		} else if (err.message.indexOf('UNIQUE_USERNAME') > -1) {
			eText = C.errorCodes('Username Already exist').DATA_DUPLICATE;
		} else {
			eText = C.errorCodes('Registration').OPERATION_FAILED;
		}
	} else {
		eText = C.errorCodes('Registration').OPERATION_FAILED;
	}

	C.errorResponse.generate(req, res, eText);
	return;
}

function showSuccess(req, res) {
	var jwt = JWT.create(newUserId);
	user = {
		id: newUserId,
		token: jwt
	}
	C.successResponse.generate(req, res, user);
}



function validate(req, res) {
	if (!req.body.username) {
		C.errorResponse.generate(req, res, C.errorCodes('Username').INVALID_PARAMETER);
		return false;
	}
	if (!req.body.password) {
		C.errorResponse.generate(req, res, C.errorCodes('Password').INVALID_PARAMETER);
		return false;
	}
	if (!req.body.email) {
		C.errorResponse.generate(req, res, C.errorCodes('Email').INVALID_PARAMETER);
		return false;
	}

	return true;

}
