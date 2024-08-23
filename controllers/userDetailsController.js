express = require('express');
const routerUserDetails = express.Router();
routerUserDetails.use(express.json());
const bcrypt = require("bcryptjs");
const { sendResetPasswordEmail } = require("../utils/nodemailer");

class UserDetailsController {
    constructor(
        userDetailsService,
        storageService,
        imageManagerService
    ) {
        this.userDetailsService = userDetailsService;
        this.storageService = storageService;
        this.imageManagerService = imageManagerService;
    }

    getUserDetails = async (req, res) => {
        const id = req.params.id;


        try {
            
            const results = await this.userDetailsService.getUserDetailsById(id);

            if (!results  || results.length === 0) {

                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const user = results[0];
            const imageUrl = user.Imagen;
            const userWithImage = { ...user, imageUrl };

            res.status(200).json({ userWithImage });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    updateUserDetails = async (req, res) => {

        const id = req.params.id;
        const formData = JSON.parse(req.body.data);
        const { Nombre, Apellido, Apellido2, correo, Telefono, direccion } = formData;
        var image = this.imageManagerService.manageImage(req);
        const fileNamePath = req.file?.path ?? null;

        try {

            if (fileNamePath) {
                const oldImage = await this.userDetailsService.getUserOldImage(id);
                this.storageService.deleteFileFromFirebase(oldImage[0].Imagen, 'avatar');
            }

            const result = await this.userDetailsService.updateUserDetails(id, Nombre, Apellido, Apellido2, correo, Telefono, direccion, image);
            if (!result) {
                return res.status(500).json({ error: 'Error while updating in the database' });
            }

            res.status(200).json({ message: 'User details updated successfully' });
        } catch (error) {
            console.log(error);
            this.storageService.deleteFileFromFirebase(fileUrl, 'avatar');
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    savePhone = async (req, res) => {
        const phone = req.body.phone;
        const token = req.headers.authorization
        const id = req.body.id;
        try {
            const verifyIfExist = await this.userDetailsService.getUserPhoneById(id);
            if (verifyIfExist.length > 0) {
                return res.status(401).json({ error: 'This user already has a phone number' });
            }

            const result = await this.userDetailsService.savePhone(phone, id);
            if (!result) {
                return res.status(500).json({ error: 'Failed while inserting into database' });
            }

            res.status(200).json({ message: 'Phone number inserted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    updateUserPhone = async (req, res) => {
        const id = req.params.id;
        const { phone } = req.body;
        try {

            const result = await this.userDetailsService.updatePhone(id, phone);
            if (!result) {
                return res.status(500).json({ error: 'Error while updating in the database' });
            }
            res.status(200).json({ message: 'Phone number updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    saveAddress = async (req, res) => {
        const { address } = req.body;
        const id = req.params.id;

        try {
            const verifyIfExist = await this.userDetailsService.getUserAddressById(id);
            if (verifyIfExist.length > 0) {
                return res.status(401).json({ error: 'This user already has an address' });
            }

            const results = await this.userDetailsService.saveAddress(id, address);
            if (!results) {
                return res.status(500).json({ error: 'Failed while inserting into database' });
            }

            res.status(200).json({ message: 'Address inserted successfully' });
        } catch (error) {
            console.log(error);
            throw new Error(`Error while saving address: ${error.message}`);
        }
    }

    updateUserAddress = async (req, res) => {
        const id = req.params.id;
        const { address } = req.body;

        try {
            const results = await this.userDetailsService.updateAddress(id, address);
            if (!results) {
                return res.status(500).json({ error: 'Error updating the address in the database' });
            }

            res.status(200).json({ message: 'Address updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    sendPasswodEmailChange = async (req, res) => {
        const host = req.headers.host;
        const user = req.user;
        try {
            const verifyEmail = await sendResetPasswordEmail(user, host);
            if (!verifyEmail) {
                return res.status(500).json({ error: 'Failed to send password reset email' });
            }

            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    updateUserPassword = async (req, res) => {

        const id = req.params.id;
        const { password } = req.body;
        try {

            const hashedPassword = await bcrypt.hash(password, 10);
            const results = await this.userDetailsService.updatePassword(id, hashedPassword);
            if (!results) {
                return res.status(500).json({ error: 'Error inserting into database' });
            }

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    deleteUser = async (req, res) => {
        const id = req.params.id;

        try {
            const result = await this.userDetailsService.deleteAccount(id);
            if (!result) {
                return res.status(500).json({ error: 'Error while deleting from the database' });
            }

            res.status(200).json({ message: 'Your account has been deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }  
}
module.exports =  UserDetailsController;