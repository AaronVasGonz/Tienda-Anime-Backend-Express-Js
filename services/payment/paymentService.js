class PaymentService {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository
    }

    async savePayment(userId, productsId, holderName, id, address, date, total, quintities, prices) {
        try {
            return await this.paymentRepository.savePayment(userId, productsId, holderName, id, address, date, total, quintities, prices);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while saving payment: ${error.message}`);
        }
    }
}

module.exports = PaymentService;