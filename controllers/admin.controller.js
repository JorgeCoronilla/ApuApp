
const getConnection = require('../ddbb/mysql')
const mongoose = require('mongoose');
const labs = require('../models/labs_model');
const stores = require('../models/stores_model');
const deliveryPoints = require('../models/deliveryPoints_model');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const pdfService = require('../invoices/invoice');
const blobStream = require('blob-stream');
const { findByIdAndRemove } = require('../models/labs_model');

const adminController = {
    dashAdmin: async (req, res) => {

        try {
            const { admin_id } = req.params;
            if (admin_id == undefined || admin_id == 0) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from app_admins where id_admin = ?;', admin_id)
            const admin_name = result[0].admin_name, surname1 = result[0].surname_1, surname2 = result[0].surname_2, email = result[0].email;
            res.render("admin_panel", { admin_name, surname1, surname2, email })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    updateAdmin: async (req, res) => {
        try {

            const { admin_name, surname_1, surname_2, email, admin_pass } = req.body;
            const { admin_id } = req.params;
            const updates = { admin_name, surname_1, surname_2, email, admin_pass }
            if (!admin_name || !surname_1 || !surname_2 || !email || !admin_pass) {
                res.status(400).json({ message: "Son necesarios todos los campos" })
            }
            const connection = await getConnection();
            let result = await connection.query('UPDATE app_admins SET ? WHERE id_admin = ? ', [updates, admin_id])
            res.status(200).json({ message: "Usuario actualizado" })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    allUsers: async (req, res) => {

        try {
            const { admin_id } = req.params;
            const connection = await getConnection();
            let result = await connection.query("select * from users");
            const users = result
            res.render("admin_allUsers", { users, admin_id })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    editUser: async (req, res) => {

        try {
            const { user } = req.params;
            if (user == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from users where id_user = ?;', user)
            const user_name = result[0].user_name, surname1 = result[0].surname_1, surname2 = result[0].surname_2, address = result[0].address, email = result[0].email;
            res.render("admin_editUser", { user_name, surname1, surname2, address, email })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    updateUser: async (req, res) => {

        try {
            const { user_name, surname_1, surname_2, address, email, user_pass } = req.body;
            const { user } = req.params;
            const updates = { user_name, surname_1, surname_2, address, email, user_pass }
            if (!user_name || !surname_1 || !surname_2 || !address || !email || !user_pass) {
                res.status(400).json({ message: "Son necesarios todos los campos" })
            }
            const connection = await getConnection();
            let result = await connection.query('UPDATE users SET ? WHERE id_user = ? ', [updates, user])
            res.status(200).json({ message: "Usuario actualizado" })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    createAdmin: async (req, res) => {

        try {
            res.render("admin_createAd")
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    insertAdmin: async (req, res) => {
        try {

            const { admin_name, surname_1, surname_2, email, admin_pass } = req.body;
            const newAdmin = { admin_name, surname_1, surname_2, email, admin_pass }
            if (!admin_name || !surname_1 || !surname_2 || !email || !admin_pass) {
                res.status(400).json({ message: "Son necesarios todos los campos" })
            }
            const connection = await getConnection();
            let result = await connection.query('INSERT INTO app_admins (admin_name, surname_1, surname_2, email, admin_pass) VALUES (?) ', newAdmin)
            res.status(200).json({ message: "Nuevo Administrador registrado" })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    checkUser: async (req, res) => {

        try {
            const { user, admin_id } = req.params;
            if (user == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from users where id_user = ?;', user)
            const user_name = result[0].user_name, surname1 = result[0].surname_1, surname2 = result[0].surname_2, address = result[0].address, email = result[0].email;

            let result2 = await connection.query('select * from bills where fk_id_user = ?;', user)
            const bills = result2
            res.render("admin_checkUser", { user_name, surname1, surname2, address, email, admin_id, bills })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    printBill: async (req, res) => {

        try {
            const { id_bill, admin_id } = req.params;
            if (id_bill == undefined) {
                res.status(400).json({ message: "Bad request. That bill doens't exist." })
            }
            console.log(id_bill)
            console.log(admin_id)
            const connection = await getConnection();
            let result = await connection.query('select * from bills where id_bill = ?;', id_bill)
            const bill = result[0];
            var item = bill.items.split('#');
            let fecha = bill.bill_date.toLocaleDateString()
            console.log(fecha)

            const doc = new PDFDocument();
            var filename = `factura${Date.now()}.pdf`

            doc
                .fillColor('#444444')
                .fontSize(20)
                .text('ApuApp', 110, 57)
                .fontSize(10)
                .text('123 Main Street', 200, 65, { align: 'right' })
                .text('Springfield, 10025', 200, 80, { align: 'right' })
                .moveDown();
            doc.text(`Numero de factura: ${bill.id_bill}`, 50, 200)
                .text(`Fecha: ${fecha}`, 50, 215)
                .text(bill.user_name, 300, 200, { align: 'right' })
                .text(bill.surname_1, 300, 215, { align: 'right' })
                .text(bill.surname_2, 300, 230, { align: 'right' })
                .text(bill.address, 300, 245, { align: 'right' })
                .text(bill.nif, 300, 260, { align: 'right' })
                .moveDown();

            let i,
                invoiceTableTop = 330;

            for (i = 0; i < item.length; i++) {
                const row = item[i];
                const position = invoiceTableTop + (i + 1) * 50;
                doc.fontSize(15)
                    .text(row, 100, position, { width: 400, align: 'right' })
                if (i == (item.length - 1)) {
                    doc.text(`Total: ${bill.total} €`, 430, position + 100)
                }
            }
            doc.fontSize(
                10,
            ).text(
                'Muchas gracias por confiar en Apu!',
                50,
                680,
                { align: 'center', width: 500 },
            );

            //doc.pipe(fs.createWriteStream(`${__dirname}/${filename}`));
            doc.pipe(fs.createWriteStream(`${__dirname}/${filename}`));

            doc.end();

            //res.redirect(`/admin/${admin_id}/print/${id_bill}/${filename}.pdf`)

            //res.render("admin_print", { bill, admin_id })
            const file = `${filename}`;

            //res.download(file, {root: `${__dirname}`}); // Set disposition and send it.
            //var stream = fs.createReadStream(`${__dirname}/`);

            //filename = encodeURIComponent(filename);

            res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
            res.setHeader('Content-type', 'application/pdf');

            //stream.pipe(res);
            fs.readFile(__dirname + filename, function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
            });

        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    deleteUser: async (req, res) => {

        try {
            res.render("admin_delete")
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    confirmDeleteUser: async (req, res) => {

        try {
            const { answer } = req.body;
            if (answer == 'yes') {
                const { user, admin_id } = req.params;
                if (!user || !admin_id) {
                    res.status(400).json({ message: "Lo siento. Ha habido un error" })
                }
                const connection = await getConnection();
                let result = await connection.query("DELETE FROM users WHERE id_user=?", user)

                res.status(200).json({ message: "Usuario eliminado" })
            } else {
                res.redirect('/')
            }
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },
    checkLabs: (req, res) => {
        const { admin_id } = req.params;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        labs.find().exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            mongoose.disconnect();
            res.render('admin_labs', {result, admin_id})
        });
    },

    checkStores: (req, res) => {
        const { admin_id } = req.params;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        stores.find().exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            mongoose.disconnect();
            res.render('admin_stores', {result, admin_id})
        });
    },

    checkdeliveryPoints: (req, res) => {
        const { admin_id } = req.params;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        deliveryPoints.find().exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            mongoose.disconnect();
            res.render('admin_deliveryPoints', {result, admin_id})
        });
    },

    findLab: (req, res) => {
        const { admin_id, labname } = req.params;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        labs.find({'labName':labname }).exec(function (err, result) {
            if (err) throw err;
            console.log(result[0].city);
            const lab = result[0]
            res.render('admin_labsEdit', {lab, admin_id})
            mongoose.disconnect();
            
        });
    },

    updateLabs:  (req, res) => {
        const { admin_id, labname } = req.params;
        const { name, address, city } = req.body;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        labs.find({'labName': labname }).exec(function (err, result) {
            if (err) throw err;
            labs.labName = name;
            labs.address = address;
            labs.city = city
            user.save(function(err){
                if (err) throw err;
                console.log("Actualización correcta");
                mongoose.disconnect();
            });
        
         
            
        });
    }
}



module.exports = adminController;