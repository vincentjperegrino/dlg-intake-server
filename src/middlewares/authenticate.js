'use strict';

const ForbiddenError = require('../errors/forbidden-error');
const jwt = require('jsonwebtoken');

exports.authenticate = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(403);
        return res.send(new ForbiddenError().map());
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);

    req.requester = {
        id: decodedToken.id,
        privilege: decodedToken.privilege,
        isActive: decodedToken.isActive,
        isVerified: decodedToken.isVerified
    };

    next();
}
