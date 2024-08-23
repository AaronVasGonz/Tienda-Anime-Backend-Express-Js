
const { body, validationResult } = require('express-validator');
class ContactController {

    constructor(contactService) {
        this.contactService = contactService;
    }

    contact = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, subject, email, message } = req.body;

        if (!name || !subject || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        try {

            const emailSending = await this.contactService.sendContactEmail(name, email, subject, message);

            if (!emailSending) {
                return res.status(500).json({ error: 'Error while sending email' });
            }

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ error: ' Internal server error' });
        }
    }
}

module.exports = ContactController;