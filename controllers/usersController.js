const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

class UsersController {
    constructor(
        userService,
        userSaveService,
        userUpdateService,
        userDeleteService
    ) {
        this.userService = userService;
        this.userSaveService = userSaveService;
        this.userUpdateService = userUpdateService;
        this.userDeleteService = userDeleteService;
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.userService.getUsers();
            if (users.length === 0) {
                return res.status(404).json({ error: 'Users not found' });
            }
            return res.status(200).json({ users });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getUser = async (req, res) => {
        const { id } = req.params;
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error("Error", error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    createUser = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nombre, apellido, apellido2, email, password, roles } = req.body;

        try {
            const { exists, message } = await this.userService.checkExistingEmail(email);
            if (exists) {
                return res.status(400).json({ error: message });
            }
            bcrypt.hash(password, 10, async (err, passwordHash) => {
                if (err) {
                    console.log("Error hashing:", err)
                } else {
                    const result = await this.userSaveService.save(nombre, apellido, apellido2, email, passwordHash, roles);
                    if (!result) {
                        res.status(500).json({ error: 'Error while inserting user' });
                    }
                    res.status(200).json({ message: 'User created successfully' });
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    updateUser = async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, apellido2, email, roles } = req.body;
    
        try {
            const user = await this.userUpdateService.update(id, nombre, apellido, apellido2, email, roles);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            res.status(200).json({ message: 'User updated' });
        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.userDeleteService.delete(id);
            if (!result > 0) {
                console.log("Error while deleting user");
                return res.status(500).json({ error: 'Error while deleting user' });
            }
            res.status(200).json({ message: 'User inactive successfully' });
        } catch (error) {
            console.error("Error", error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = UsersController