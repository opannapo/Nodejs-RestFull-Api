module.exports = {
    encode: function (val) {
        var enc = new Buffer(val+'','utf8').toString('base64');
        console.log('Base64 encode ' + val + ' to ' + enc);
        return enc;
    },

    decode: function (val) {
        var dec = new Buffer(val, 'base64').toString('utf8');
        console.log('Base64 decode ' + val + ' to ' + dec);
        return dec;
    }
}; 