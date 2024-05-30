'use strict';

const express = require('express');
const UserController = require('./../controllers/users');
const { authenticate } = require('./../middlewares/authenticate');
const validate = require('./../validators/validate');

const UserMapper = require('../mappers/user-mapper');
const AuthMapper = require('../mappers/auth-mapper');

const AjvValidationError = require('../errors/ajv-validation-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const loginSchema = require('../validators/schema/users/login-credentials');
const createSchema = require('../validators/schema/users/create');
const updateSchema = require('../validators/schema/users/update');
const deleteSchema = require('../validators/schema/users/delete');
const passwordRecoverySchema = require('../validators/schema/users/password-recovery');

class UserRoute {
    constructor (config) {
        this.config = config;

        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes () {
        this.router.get('/v1/users', authenticate, this.list);
        this.router.get('/v1/users/:id', authenticate, this.get);
        this.router.post('/v1/users/login', this.login);
        this.router.post('/v1/users', this.create);
        this.router.patch('/v1/users/:id', authenticate, this.update);
        this.router.delete('/v1/users/:id', authenticate, this.delete);
        this.router.post('/v1/users/password-recovery', this.sendRecoveryEmail);
        this.router.post('/v1/users/reset-password', this.resetPassword);
    }

    list (_req, res) {
        new UserController.ListController().process(function (_error, result) {
            res.send((new UserMapper(result)).map());
        });
    }

    get (req, res) {
        new UserController.GetController({
            id: parseInt(req.params.id),
        }).process(function (_error, result) {
            res.send((new UserMapper(result)).map());
        });
    }

    login (req, res) {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
            privilege: req.body.privilege
        };

        const validation = validate(credentials, loginSchema);

        if (!validation.isValid) {
            res.status(400);
            return res.send(new AjvValidationError(validation).map());
        }

        new UserController.LoginController(credentials)
            .process(function(error, result) {
            if (error) {
                res.status(401);
                return res.send(new UnauthorizedError().map());
            }

                res.send((new AuthMapper(result)).map())
        });
    }

    create (req, res) {
        const user = req.body;
    
        const validation = validate(user, createSchema);
    
        if (!validation.isValid) {
            res.status(400);
            return res.send(new AjvValidationError(validation).map());
        }
    
        new UserController.CreateController(user).process(function (
            error,
            result
        ) {
            if (error) {
                res.status(500);
                return res.send(error.message);
            }
    
            res.status(201).send(new UserMapper(result).map());
        });
    }    

    update(req, res) {
        const user = {
            id: parseInt(req.params.id),
            ...req.body
        };

        const validation = validate(user, updateSchema);

        if (!validation.isValid) {
            res.status(400);
            return res.send(new AjvValidationError(validation).map());
        }

        new UserController.UpdateController(user)
            .process(function (error, result) {
                if (error) {
                    res.status(500);
                    return res.send({ error: error.message });
                }

                res.send((new UserMapper(result)).map());
            });
    }

    delete(req, res) {
        const params = { id: parseInt(req.params.id) };

        const validation = validate(params, deleteSchema);

        if (!validation.isValid) {
            res.status(400);
            return res.send(new AjvValidationError(validation).map());
        }

        new UserController.DeleteController(params)
            .process(function (error, result) {
                if (error) {
                    res.status(500);
                    return res.send({ error: error.message });
                }

                res.send((new UserMapper(result)).map());
            });
    }

    sendRecoveryEmail(req, res) {
        const params = { email: req.body.email };

        const validation = validate(params, passwordRecoverySchema);

        if (!validation.isValid) {
            res.status(400);
            return res.send(new AjvValidationError(validation).map());
        }

        new UserController.PasswordRecoveryController(params)
            .sendRecoveryEmail(function (error, result) {
                if (error) {
                    res.status(500);
                    return res.send({ error: error.message });
                }

                res.send(result);
            });
    }

    resetPassword(req, res) {
        const params = {
            token: req.body.token,
            password: req.body.password
        };

        const validation = validate(params, passwordRecoverySchema);

        if (!validation.isValid) {
            res.status(400);
            return res.send(new AjvValidationError(validation).map());
        }

        new UserController.PasswordRecoveryController(params)
            .resetPassword(function (error, result) {
                if (error) {
                    res.status(500);
                    return res.send({ error: error.message });
                }

                res.send(result);
            });
    }
}

module.exports = UserRoute;