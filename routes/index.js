var C = require('../constant/C.js');
var JWT = require('../helper/JWT.js'); 
var App = C.App;
var request;
var userId;

function start(request, req, res) {
    request.exe(req, res, userId);
}

function authorization(req, res) {
    if (req.headers['authorization']) {
        var jwt = req.headers['authorization'].replace('Bearer ', '');
        console.log("Authorization Header JWT FULL : ", jwt);

        var verify = JWT.verify(jwt);
        console.log("Authorization Header JWT verify: ", verify);
        if (verify.success) {
            userId = 1123244334;
            var exp = verify.data.exp;
            var now = Math.round(new Date().getTime() / 1000);
            var calculate = parseInt(exp) - parseInt(now);
            console.log("Authorization JWT exp:" + exp + '|| now:' + now);
            console.log("Authorization JWT exp-now:" + calculate);
            console.log("Authorization JWT id :" + userId);
        } else {
            if (verify.error.name == 'TokenExpiredError') {
                C.errorResponse.generate(req, res, C.errorCodes().TOKEN_EXPIRED);
                return false;
            } else if (verify.error.name == 'JsonWebTokenError') {
                C.errorResponse.generate(req, res, C.errorCodes().TOKEN_INVALID);
                return false;
            } else {
                C.errorResponse.generate(req, res, C.errorCodes().TOKEN_INVALID);
                return false;
            }
        }
    } else {
        console.log("Authorization Header is: ", req.headers['authorization']);
        C.errorResponse.generate(req, res, C.errorCodes().TOKEN_UNAUTHORIZED);
        return false;
    }

    return true;
}



/************************************************************/
/*************************  ROUTE   *************************/
/************************************************************/

//DEFAULT
App.get('/home', function (req, res) {
    start(require('./default/home/exe.js'), req, res);
});
App.get('/', function (req, res) {
    start(require('./default/home/exe.js'), req, res);
});
 
//USER 
App.post('/user/login/', C.urlEncBodyParser, function (req, res) {
    start(require('./endpoint/user/login.js'), req, res);
}); 
App.post('/user/register/', C.urlEncBodyParser, function (req, res) {
    start(require('./endpoint/user/register.js'), req, res);
}); 
App.get('/user/detail/', function (req, res) {
    if (authorization(req, res))
        start(require('./endpoint/user/detail.js'), req, res);
});
App.post('/user/upload/', function (req, res) {
    if (authorization(req, res))
        start(require('./endpoint/user/upload.js'), req, res);
});
App.post('/user/follow/', C.urlEncBodyParser, function (req, res) {
    if (authorization(req, res))
        start(require('./endpoint/user/follow.js'), req, res);
});