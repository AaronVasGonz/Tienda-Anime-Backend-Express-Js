const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();

class LoginController {
    constructor(userService, loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    login = async (req, res) => {
        const { correo, password } = req.body;
        try {
            const userDb = await this.verifyUserData(correo, password);
            if (!userDb) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const verify = await this.loginService.verifyUser(correo);
            if (verify === "Inactivo") {
                return res.status(400).json({ error: "Your account is not active. Please verify your email, or if you have deleted your account, contact the administrator." });
            }

            const userDetails = await this.verifyRoles(userDb);
            if (!userDetails) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const accessToken = this.generateAccessToken(userDetails);

            res.header('Authorization', `Bearer ${accessToken}`).json({
                message: 'User authenticated',
                token: accessToken,
                user: userDetails
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    async verifyUserData(correo, password) {
        const userDb = await this.userService.getUserByEmail(correo);
        if (!userDb) {
            throw new Error("User not found");
        }

        const verifyPassword = await bcrypt.compare(password, userDb.password);
        if (!verifyPassword) {
            throw new Error("Invalid credentials");
        }

        return userDb;
    }

    async verifyRoles(user) {
        const rolesData = await this.loginService.getUserRoles(user.id);
        if (!rolesData) {
            throw new Error("Invalid credentials");
        }

        const userDetails = {
            id: user.id,
            correo: user.correo,
            Nombre: user.Nombre,
            roles: {
                rolUsuario: rolesData.roleUser,
                roleAdministrador: rolesData.roleAdmin
            },
        };

        return userDetails;
    }

    generateAccessToken = (user) => {
        return jwt.sign(user, process.env.SECRET, { expiresIn: '190m' });
    }
}

module.exports = LoginController;