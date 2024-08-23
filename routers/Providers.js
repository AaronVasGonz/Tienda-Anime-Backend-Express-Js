const express = require('express');
const routerProviders = express.Router();
const {authAdmin} = require('../middlewares/jwtServices');
//Importing Provider Services
const {ProviderService,ProviderRepository,ProviderSaveService, ProviderUpdateService, ProviderDeleteService} = require('../services/index');
//Importing Controllers
const ProviderController = require('../controllers/providerController');

//Services
const providerRepository = new ProviderRepository();
const providerService = new ProviderService(providerRepository);
const providerSaveService = new ProviderSaveService(providerRepository);
const providerUpdateService = new ProviderUpdateService(providerRepository);
const providerDeleteService = new ProviderDeleteService(providerRepository);

const providerController = new ProviderController(providerService, providerSaveService, providerUpdateService, providerDeleteService);

routerProviders.use(express.json());
routerProviders.get('/providersAdmin', authAdmin, providerController.getProviders);
routerProviders.post('/providersAdmin', authAdmin, providerController.createProvider);
routerProviders.get('/providersAdmin/:id', authAdmin, providerController.getProvider)
routerProviders.put('/providersAdmin/:id', authAdmin, providerController.updateProvider);
routerProviders.delete('/providersAdmin/:id', authAdmin, providerController.deleteProvider);

module.exports = routerProviders;