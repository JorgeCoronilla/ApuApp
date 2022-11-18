const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const userModel = require("../models/login.model");
const getConnection = require('../ddbb/mysql');

const User = {
    start: async (req, res) => {
        res.render("../views/login.ejs");
    },
    getUser: async (req, res) => {
        const { email } = req.body;
        console.log(email)
        const { password } = req.body;
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
                name: user[0].user_name,
                user_id: user[0].id_user
            }, process.env.TOKEN_SECRET)
            res.redirect('/index.html') 
            // res.header('auth-token', token).json({
            //     data: { token }
            // })
        }
        if (admin[0]) {
            let validAdmin = admin[0].admin_pass;
            if (password != validAdmin) return res.status(400).json({ error: 'contraseña no válida' })
            // create token
            const token = jwt.sign({
                name: admin[0].admin_name,
                admin_id: admin[0].id_admin
            }, process.env.TOKEN_SECRET)
            res.header('auth-token', token).json({
                data: { token }
            })
        }
    }
}
module.exports = User;