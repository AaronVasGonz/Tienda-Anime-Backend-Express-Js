// ../functions/nodemailer.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Función para enviar correo usando promesas
const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return reject(false);
            } else {
                return resolve(true);
            }
        });
    });
};

async function sendConfirmationEmail(user, host) {
    const tokenPayload = { userId: user.id };
    const token = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '190m' });
    const confirmationUrl = `http://${host}/api/confirm-account?token=${token}`;
    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: user.email,
        subject: 'Confirm Account',
        html: `
            <p>Hello ${user.nombre}!</p>
            <p>Thank you for registering with our application. Please confirm your account by clicking on the following link:</p>
            <a href="${confirmationUrl}">${confirmationUrl}</a>
        `
    };

    try {
        const result = await sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function sendResetPasswordEmail(user, host) {
  

    const id = user.id;
  
    const tokenPayload = { userId: id };
    const token = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '190m' });
    const resetPasswordUrl = `http://${host}/api/reset-password?token=${token}`;
    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: user.correo,
        subject: 'Reset Password',
        html: `
            <p>Hello ${user.Nombre}!</p>
            <p>You requested a password reset. Please click on the following link to reset your password:</p>
            <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
        `
    };

    try {
        const result = await sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function sendElectronicalInvoice(user, invoice) {
    let id_factura = 0;
    let total = 0;
    let date = new Date();
    invoice.forEach(product => {
        console.log(product, "producto");
        id_factura = product.id_factura;
        total = product.total;
    });

    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: user.correo,
        subject: 'Electronic Invoice',
        html: `

            <h1>Electronic Invoice</h1>
            <h2>Anime WebShop Store</h2>
            <p>Dear Customer ${user.Nombre}, here is your electronic invoice</p>
            <p>Invoice Number: ${id_factura}</p>
            <p>Date: ${date.toLocaleDateString()}</p>
            <table style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Product</th>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Price</th>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Quantity</th>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.map(product => `
                        <tr>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">${product.nombre_producto}</td>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">$${product.precio}</td>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">${product.cantidad}</td>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">$${product.cantidad * product.precio}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">Total:</td>
                        <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left; font-weight: bold; background-color: #b07bdc; color: white;">$${total}</td>
                    </tr>
                </tfoot>
            </table>
        `
    };

    try {
        const result = await sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const sendEmailByClient = async (name, email, subject, clientMessage) => {
    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: 'arjoz988@gmail.com',
        subject: `Mensaje de cliente: ${subject}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${clientMessage}`,
        html: `<p><strong>Nombre:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Mensaje:</strong></p>
               <p>${clientMessage}</p>`
    }

    try {
        const result = await sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { sendConfirmationEmail, sendResetPasswordEmail, sendElectronicalInvoice, sendEmailByClient };
