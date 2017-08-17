var C = require('../../../constant/C.js');

module.exports = {
	exe: function (req, res) {
		console.log('Console ' + req.url + ' ' + req.params);
		if (validate(req, res)) {
			var id = req.param('id');
			var q1 = '' +
				'SELECT ' +
				'User.ID as ID, ' +
				'User.UserName as UserName, ' +
				'User.FullName as FullName, ' +
				'User.Password as Password, ' +
				'User.ShortDescription as ShortDescription, ' +
				'User.Bio as Bio, ' +
				'User.Phone as Phone, ' +
				'User.Email as Email, ' +
				'User.FollowerCount as FollowerCount, ' +
				'User.FollowingCount as FollowingCount, ' +
				'User.BestFriendCount as BestFriendCount, ' +
				'User.PostCount as PostCount, ' +
				'User.ImageProfile as ImageProfile, ' +
				'User.ImageCover as ImageCover, ' +
				'User.Latitude as Latitude, ' +
				'User.Longitude as Longitude, ' +
				'User.Address as Address, ' +
				'User.ID_City as ID_City, ' +
				'User.Interest as Interest, ' +
				'User.BirthDate as BirthDate, ' +
				'User.JoinDate as JoinDate, ' +
				'User.LastActive as LastActive, ' +
				'User.LastUpdated as LastUpdated, ' +
				'User.LastLogin as LastLogin, ' +
				'User.StatusActive as StatusActive, ' +
				'User.StatusLogin as StatusLogin, ' +
				'User.Gender as Gender, ' +
				'User.Wesite as Wesite,  ' +
				'City.lat as CityLat, ' +
				'City.lon as CityLon, ' +
				'City.name as CityName, ' +
				'City.propinsi as CityPropinsi ' +
				'FROM User LEFT JOIN City ON User.ID_City=City.ID  ' +
				'WHERE User.ID=' + id;

			C.mysqlCon.query(q1, function (err, rows) {
				console.log(q1);
				if (!err && rows[0] != null) {
					console.log('--- rows[0] ---');
					console.log('rows[0] :: ' + rows[0]);

					var address = {
						name: rows[0].Address,
						cityId: rows[0].ID_City,
						cityLat: rows[0].CityLat,
						cityLon: rows[0].CityLon,
						cityName: rows[0].CityName,
						cityPropinsi: rows[0].CityPropinsi
					}
					var user = {
						id: rows[0].ID,
						userName: rows[0].UserName,
						fullName: rows[0].FullName,
						//password: rows[0].Password,
						shortDescription: rows[0].ShortDescription,
						bio: rows[0].Bio,
						phone: rows[0].Phone,
						email: rows[0].Email,
						followerCount: rows[0].FollowerCount,
						followingCount: rows[0].FollowingCount,
						bestFriendCount: rows[0].BestFriendCount,
						postCount: rows[0].PostCount,
						imageProfile: rows[0].ImageProfile,
						imageCover: rows[0].ImageCover,
						latitude: rows[0].Latitude,
						longitude: rows[0].Longitude,
						interest: rows[0].Interest,
						birthDate: rows[0].BirthDate,
						joinDate: rows[0].JoinDate,
						lastActive: rows[0].LastActive,
						lastUpdated: rows[0].LastUpdated,
						lastLogin: rows[0].LastLogin,
						statusActive: rows[0].StatusActive,
						statusLogin: rows[0].StatusLogin,
						gender: rows[0].Gender,
						wesite: rows[0].Wesite,
						address: address
					}

					C.successResponse.generate(req, res, user);
				} else {
					console.log(err);
					C.errorResponse.generate(req, res, C.errorCodes().DATA_NOT_FOUND);
				}
			});
		}
	}
};


function validate(req, res) {
	if (!req.param('id')) {
		C.errorResponse.generate(req, res, C.errorCodes('ID').INVALID_PARAMETER);
		return false;
	}

	return true;
}
