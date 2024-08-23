
express = require('express');
const routerCountries = express.Router();
routerCountries.use(express.json());
const {phoneCodes} = require('../Repository/phoneCodes');
const {CountryService} = require('../services/index');

//services
const countryService = new CountryService(phoneCodes);

//controllers
const CountriesController = require('../controllers/countriesController');
const countriesController = new CountriesController(countryService);

routerCountries.get('/countries', countriesController.getCountries);

module.exports = routerCountries