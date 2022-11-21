const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const getConnection = require('../ddbb/mysql');
const nodemailer = require("nodemailer");
const { application } = require('express');
const User = {
    start: async (req, res) => {
        res.render("../views/login.ejs");
    },
    forgot: async (req, res) => {
        res.render("../views/forgot.ejs");
    },
    confirmation: async (req, res) => {
        res.render("../views/confirmacion.ejs");
    },
    /**
     * Este middleware coge el usuario, crea el token de acceso y redirecciona a los paneles de usuario
     * @param {*} req 
     * @param {*} res 
     * @returns redirección a panel de usuario
     */
    getUser: async (req, res) => {
        const { email, password } = req.body;
        console.log(email)
        // const { password } = req.body;
        let con = await getConnection();
        // validar correo 
        if (!email || !password) return res.status(400).json({ error: 'Por favor introduce tus credenciales correctamente' });
        // se busca el usuario por email en la base de datos, el email es UNIQUE
        let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
        let query = mysql.format(selectQuery, ['users', 'email', email]);
        let query2 = mysql.format(selectQuery, ['app_admins', 'email', email]);
        let user = await con.query(query);
        let admin = await con.query(query2);

        if (!user[0] && !admin[0]) return res.status(400).json({ error: 'Usuario no encontrado' });
        if (user[0]) {
            let validUser = user[0].user_pass;
            if (password != validUser) return res.status(400).json({ error: 'contraseña no válida' })
            // create token
            const token = jwt.sign({
                email: user[0].email,
                id_user: user[0].id_user
            }, process.env.TOKEN_SECRET, { expiresIn: '600000' })
            res.location(`/userDash/${token}`);
            res.sendStatus(302);
        }
        if (admin[0]) {
            let validAdmin = admin[0].admin_pass;
            if (password != validAdmin) return res.status(400).json({ error: 'contraseña no válida' })
            // create token
            const token = jwt.sign({
                email: admin[0].email,
                id_admin: admin[0].id_admin

            }, process.env.TOKEN_SECRET, { expiresIn: '600000' })
            res.location(`/admin/${token}`);

            res.sendStatus(302);
        }
    },
    /**
     * Envía un email con el token al usuario para poder cambiar la contraseña
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    sendEmail: async (req, res) => {
        const { email } = req.body;
        let con = await getConnection();

        let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
        let query = mysql.format(selectQuery, ['users', 'email', email]);
        let query2 = mysql.format(selectQuery, ['app_admins', 'email', email]);
        let user = await con.query(query);
        let admin = await con.query(query2);
        console.log(user)
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.transporter_user,
                pass: process.env.transporter_pass
            }
        });
        if (!user[0] && !admin[0]) return res.status(400).json({ error: 'Usuario no encontrado' });
        if (user[0]) {
            const token = jwt.sign({
                email: user[0].email,
                id_user: user[0].id_user
            }, process.env.TOKEN_SECRET, { expiresIn: '30000' })
            let message = {
                from: 'apu shop <sender@example.com>',
                to: user[0].email,
                subject: 'Link para cambiar tu contraseña',
                text: '',
                html: 'Hola, haz click en este link para cambiar tu contraseña<br>' + `<a href="http://localhost:3000/login/confirmacion/${token}" target="_blank" rel="external">http://localhost:3000/confirmacion/${token}</a>`
            };
            // Envia el correo con el enlace
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Hubo un error en el envío ' + err.message);
                    return process.exit(1);
                }
                // Imprime en el correo el mensaje
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }
        if (admin[0]) {
            const token = jwt.sign({
                email: admin[0].email,
                id_admin: admin[0].id_admin
            }, process.env.TOKEN_SECRET, { expiresIn: '30000' })
            let message = {
                from: 'apu shop <sender@example.com>',
                to: admin[0].email,
                subject: 'Link para cambiar tu contraseña',
                text: '',
                html: 'Hola, haz click en este link para cambiar tu contraseña<br>' + `<a href="http://localhost:3000/login/confirmacion/${token}" target="_blank" rel="external">http://localhost:3000/confirmacion/${token}</a>`
            };
            // Envia el correo con el enlace
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Hubo un error en el envío ' + err.message);
                    return process.exit(1);
                }
                // Imprime en el correo el mensaje
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }
        res.render("../views/email_sent.ejs")
    },
    /**
     * Hace update del password a través del login de confirmación
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    updatePassword: async (req, res) => {
        const { password1 } = req.body;
        const { password2 } = req.body;
        const { token } = req.params;
        let match = password1 == password2;
        if (!match) return res.status(400).json({ error: 'Las contraseñas no coinciden' });
        let con = await getConnection();
        let info = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        console.log(info);
        if (info.id_user) {
            let query = mysql.format(updateQuery, ["users", "user_pass", password1, "email", info.email]);
            await con.query(query);
            res.render("../views/new_password.ejs")
        } else {
            let query2 = mysql.format(updateQuery, ["app_admins", "admin_pass", password1, "email", info.email]);
            try {
                await con.query(query2);
            }
            catch (error) {
                console.log(`ERROR: ${error.stack}`);
            }

        }
        res.render("../views/new_password.ejs")
    }
}
module.exports = User;