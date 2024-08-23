require('dotenv').config();
const bcrypt = require("bcryptjs");
class AuthUserController {
    constructor(userService, authUserService ,verifyUser) {
        this.userService = userService;
        this.verifyUser = verifyUser;
        this.authUserService = authUserService;
    }

    confirmAccount = async (req, res) => {
        const { token } = req.query;
      
        if (!token) {
            return res.status(400).json({ error: 'Token not provided' });
        }
    
        try {
            const decoded = await this.verifyUser(token);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }
    
            const userId = decoded.userId;
            if (!userId) {
                return res.status(400).json({ error: 'Invalid token payload' });
            }
    
            const result = await this.userService.getUserById(userId);
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }

            const confirmed = await this.authUserService.confirmAccount(userId);
            if (!confirmed) {
                return res.status(500).json({ error: 'Error while confirming account' });
            }

            res.redirect('http://localhost:3000/login?confirm=true');
        } catch (error) {
            console.log('Error in confirmAccount:', error);
            res.status(500).json({ error: 'Error while confirming account' });
        }
    }

    resetPassword = async (req, res) => {
        try {
            const token = req.query.token;

            if (!token) {
                return res.status(400).json({ error: 'Token not provided' });
            }

            const decoded = await this.verifyUser(token);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            const userId = decoded.userId;
            const result = await this.userService.getUserById(userId);

            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            const user = result;

            res.redirect('http://localhost:3000/settings/passwordChanger/updatePassword?token=' + token + '&email=' + user.correo + '&confirm=true');

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while resetting password' });
        }
    }
}

module.exports = AuthUserController;