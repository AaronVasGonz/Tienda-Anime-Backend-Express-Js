const express = require('express');
require('dotenv').config();
const routerAtuh = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {verifyUser} = require('../utils/jwt');
routerAtuh.use(express.json());

//import services and repositories
const {RoleRepository, UserRepository, UserService, AuthenticationService} = require('../services/index');
//repositories
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
//services
const userService = new UserService(userRepository);
const authenticationService = new AuthenticationService(roleRepository);
//imrport controllers
const AuthUserController = require('../controllers/authUserController');

//controllers
const authUserController = new AuthUserController(userService, authenticationService ,verifyUser);

routerAtuh.get('/auth', authMiddleware, (req, res) => {

    res.json({ message: 'Token válido', user: req.user });

});

routerAtuh.get('/confirm-account', authUserController.confirmAccount);

routerAtuh.get('/reset-password', authUserController.resetPassword);


module.exports = routerAtuh;
