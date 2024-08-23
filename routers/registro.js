const express = require('express');
const routerRegistro = express.Router();
const {validateSignUp} = require('../utils/validation/validateSignUp.js');
//import services and repositories
const {UserService,SignUpRepository, SignUpService, UserRepository, RoleRepository} = require("../services/index");
const User = require('../Models/user');

//Services 
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
const signUpRepository = new SignUpRepository();
const userService = new UserService(userRepository);
const signUpService = new SignUpService(signUpRepository);

//Import controller 
const SignUpController = require('../controllers/signUpController');

//Controller 
const signUpController = new SignUpController(userService, signUpService);

//Middleware
routerRegistro.use(express.json());
routerRegistro.post("/registro", validateSignUp , signUpController.signUp);

module.exports = routerRegistro;