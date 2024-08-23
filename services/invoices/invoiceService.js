class InvoiceService {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    
    async getInvoice(id) {
        try {
            return await this.invoiceRepository.getInvoice(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting invoice: ${error.message}`);
        }
    }
}

module.exports = InvoiceService;