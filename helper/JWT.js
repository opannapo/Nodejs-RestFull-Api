var jwt = require('jsonwebtoken');
const key = 'rahasia1029384756';
var result;

module.exports = {
    create: function (val) {
        return jwt.sign({
            //exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 Jam
            //exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),//1 Hari 
            //exp: Math.floor(Date.now() / 1000) + (((60 * 60) * 24) * 7), //1 Minggu
            //exp: Math.floor(Date.now() / 1000) + (60 * 2),//2 Menit 
            exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),//1 Hari 
            id: val
        }, key);
    },
    verify: function (val) {
        try {
            var decoded = jwt.verify(val, key);
            result = {
                success: true,
                data: decoded
            }
            return result;
        } catch (err) {
            result = {
                success: false,
                error: err
            }
            return result;
        }
    }
}; 