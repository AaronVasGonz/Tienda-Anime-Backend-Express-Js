
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { sendElectronicalInvoice } = require('../utils/nodemailer');
class PaymentController {
    constructor(paymentService, invoiceService) {
        this.paymentService = paymentService;
        this.invoiceService = invoiceService;
    }
    
    savePayment = async (req, res) => {
        try {
            const user = req.user;
            let { id, amount, name, address, idProducts, CostumerId, prices, quantityProducts } = req.body;
            let date = new Date();
            amount = Math.round(amount * 100);
            prices = prices.join(',');
            idProducts = idProducts.join(',');
            quantityProducts = quantityProducts.join(',');

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                description: 'Payment for products',
                payment_method: id,
                confirm: true,
                return_url: 'http://localhost:3000',
                payment_method_options: {
                    card: {
                        request_three_d_secure: 'any',
                    },
                },
            });

            if (!paymentIntent) {
                return res.status(500).json({ message: 'Error while saving payment' });
            }

            const total = amount / 100;

            const idUser = user.id;
            const result = await this.paymentService.savePayment( idUser, idProducts, name, CostumerId, address, date, total, quantityProducts, prices);

            if (!result) {
                return res.status(500).json({ error: 'Error while saving payment' });
            }

            const invoiceId = result.id_factura;

            const invoice =  await this.invoiceService.getInvoice(invoiceId);

            if (!invoice) {
                return res.status(500).json({ error: 'Error while saving payment' });
            }

            const sendEmailResult = await sendElectronicalInvoice(user, invoice);

            if (!sendEmailResult) {
                return res.status(500).json({ error: 'Error while saving payment' });
            }

            res.json({ message: 'Payment saved successfully', clientSecret: paymentIntent.client_secret });

        } catch (error) {

            console.log(error);
            res.status(500).json({ error: 'Error while saving payment' });
        }
    }
}

module.exports = PaymentController