const { sendEmailByClient } = require('../../utils/nodemailer');

class ContactService {
    async sendContactEmail(name, email, subject, message) {
        try {
            return await sendEmailByClient(name, email, subject, message);
        } catch (error) {
            throw new Error('Error while sending email');
        }
    }
}

module.exports = ContactService;
