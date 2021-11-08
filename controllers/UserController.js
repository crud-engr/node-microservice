const UserService = require('../services/UserService');

exports.login = (req, res) => {
    return UserService.login(req, res);
}

exports.patchJsonObject = (req, res) => {
    return UserService.patchJsonObject(req, res);
}

exports.createThumbnail = (req, res) => {
    return UserService.createThumbnail(req, res);
}