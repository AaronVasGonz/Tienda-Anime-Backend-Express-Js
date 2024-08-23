const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const { sendConfirmationEmail } = require('../utils/nodemailer');
class SignUpController {

    constructor(userService, signUpService) {
        this.userService = userService;
        this.signUpService = signUpService;
    }

    signUp = async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, nombre, apellido, apellido2, password } = req.body;

        const SalRounds = 10;

        try {
            const { exist, message } = await this.userService.checkExistingEmail(email);
            if (exist) {
                return res.status(400).json({ error: message });
            }
            console.log("hola");
            const passwordHash = await bcrypt.hash(password, SalRounds);
            if (!passwordHash) {
                return res.status(500).json({ error: 'Failed to hash password' });
            }
    
            const result = await this.signUpService.signUp(nombre, apellido, apellido2, email, passwordHash);
            if (!result) {
                return res.status(500).json({ error: 'Failed to create user' });
            }

            console.log(result.user.dataValues, "este es el id ");

            const user = { id: result.user.dataValues.id, nombre, email };

            const host = req.headers.host;
            const verifyConfirmationEmail = await sendConfirmationEmail(user, host);
            if (!verifyConfirmationEmail) {
                return res.status(500).json({ error: 'Failed to send confirmation email' });
            }

            return res.status(200).json({ message: 'User created successfully' });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = SignUpController;