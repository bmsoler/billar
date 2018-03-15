var jwt = require('jwt-simple');
var moment_timiezone = require('moment-timezone');
var config = require('../../config/config');

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        iat: moment_timiezone().unix(),
        exp: moment_timiezone().add(14, "days").unix(),
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};