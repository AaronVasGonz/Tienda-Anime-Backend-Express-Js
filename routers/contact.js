
const express = require('express');
const routerContact = express.Router();
const { validateContact } = require('../utils/validation/validateContact');
//import Services
const {ContactService} = require('../services/index');
//services
const contactService = new ContactService();
//import controllers
const ContactController = require('../controllers/contactController');
//Controllers
const contactController = new ContactController(contactService);
//Middleware
routerContact.use(express.json());
// Validate fields
routerContact.post('/contact', validateContact , contactController.contact)

module.exports = routerContact;