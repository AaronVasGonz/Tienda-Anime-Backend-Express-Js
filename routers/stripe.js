const express = require('express');
const routerStripe = express.Router();
const {authUser} = require('../middlewares/jwtServices');

//importing services and repositories
const {PaymentRepository, PaymentService, InvoiceRepository, InvoiceService} = require('../services/index');

//repositories
const invoiceRepository = new InvoiceRepository();
const paymentRepository = new PaymentRepository();

//services
const invoiceService = new InvoiceService(invoiceRepository);
const paymentService = new PaymentService(paymentRepository);

//importing controllers
const PaymentController = require('../controllers/paymentController');

//controllers
const paymentController = new PaymentController(paymentService, invoiceService);

routerStripe.post('/create-checkout-session', authUser , paymentController.savePayment);

module.exports = routerStripe;