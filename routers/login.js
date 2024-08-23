const express = require('express');
const routerLogin = express.Router();

//import services
const { UserService, LoginService, LoginRepository, RoleLoginRepository, UserRepository } = require("../services/index");

//services & repositories
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const roleLoginRepository = new RoleLoginRepository();
const loginRepository = new LoginRepository(userService, roleLoginRepository);
const loginService = new LoginService(loginRepository, roleLoginRepository);

//import controllers
const LoginController = require('../controllers/loginController');

//controllers
const loginController = new LoginController(userService, loginService);

routerLogin.use(express.urlencoded({ extended: false }));
routerLogin.use(express.json());

//asignamos la ruta post login para las request y los res desde el proyecto de react tienda anime
routerLogin.post('/login', loginController.login);

module.exports = routerLogin;