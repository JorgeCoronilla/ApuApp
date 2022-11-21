const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const userModel = require("../models/login.model");
const getConnection = require('../ddbb/mysql');
const nodemailer = require("nodemailer");
const User = {
    start: async (req, res) => {
        res.render("../views/login.ejs");
    },
    forgot: async (req, res) => {
        res.render("../views/forgot.ejs");
    },
    getUser: async (req, res) => {
        const { email, password } = req.body;
        console.log(email)
        // const { password } = req.body;
        let con = await getConnection();
        // validar correo 
        if (!email || !password) return res.status(400).json({ error: 'Por favor introduce tus credenciales correctamente' });
        // se busca el usuario por email en la base de datos (usar sql)
        let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
        let query = mysql.format(selectQuery, ['users', 'email', email]);
        let query2 = mysql.format(selectQuery, ['app_admins', 'email', email]);
        let user = await con.query(query);
        console.log(user);
        let admin = await con.query(query2);
        console.log(admin);
        if (!user[0] && !admin[0]) return res.status(400).json({ error: 'Usuario no encontrado' });
        if (user[0]) {
            let validUser = user[0].user_pass;
            if (password != validUser) return res.status(400).json({ error: 'contraseña no válida' })
            // create token
            const token = jwt.sign({
                email: user[0].email,
                id_user: user[0].id_user
            }, process.env.TOKEN_SECRET, { expiresIn: '600000' })
            res.location(`http://127.0.0.1:3000/login/confirmacion/${token}`);
            // res.location(`http://127.0.0.1:3000/userDash/${token}`);
            res.sendStatus(302);
        }
        if (admin[0]) {
            let validAdmin = admin[0].admin_pass;
            if (password != validAdmin) return res.status(400).json({ error: 'contraseña no válida' })
            // create token
            const token = jwt.sign({
                email: admin[0].email,
                id_admin: admin[0].id_admin
            }, process.env.TOKEN_SECRET, { expiresIn: '6000000000' })
            res.location(`http://127.0.0.1:3000/login/confirmacion/${token}`);
            res.sendStatus(302);
        }
    },
    sendEmail: async (req, res, next) => {
        const { email } = req.body;
        let con = await getConnection();
        let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
        let query = mysql.format(selectQuery, ['users', 'email', email]);
        let query2 = mysql.format(selectQuery, ['app_admins', 'email', email]);
        let user = await con.query(query);
        let admin = await con.query(query2);
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
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
                text: 'Hola, haz click en este link para cambiar tu contraseña',
                html: `http://localhost:5000/confirmacion/${token}`
            };
            // Envia el correo con el enlace
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
            // Imprime en el correo el mensaje
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }
        if (admin[0]) {
        }
    },
    verifyToken: (req, res, next) => {
        // res.json('validate');
        const { token } = req.params
        // res.json(token);
        if (!token) return res.status(401).json({ error: 'Acceso denegado' })
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified;
            // userInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            // res.json({ "Este es el id": userInfo.id_user });
            // userinfo.id_user o userinfo.id_admin
            // next() // 
            res.render("../views/confirmacion.ejs");
        } catch (error) {
            res.status(400).json({ error: 'token no es válido' })
        }
    }
}
module.exports = User;