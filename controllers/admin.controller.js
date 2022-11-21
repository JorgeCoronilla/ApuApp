const getConnection = require('../ddbb/mysql')
const mongoose = require('mongoose');
const labs = require('../models/labs_model');
const stores = require('../models/stores_model');
const deliveryPoints = require('../models/deliveryPoints_model');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const pdfService = require('../invoices/invoice');
const blobStream = require('blob-stream');
const jwt = require('jsonwebtoken');

function verify (admin_id, req){
    const verified = jwt.verify(admin_id, process.env.TOKEN_SECRET)
    req.user = verified;
}

const adminController = {
    dashAdmin: async (req, res) => {
        try {
            const { admin_id } = req.params;
            verify (admin_id, req)
            userInfo = JSON.parse(Buffer.from(admin_id.split('.')[1], 'base64').toString());
            if (userInfo.id_admin == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            res.render("admin_panel", { admin_id })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    showAdmin: async (req, res) => {

        try {
            const { admin_id } = req.params;
            verify (admin_id, req)
            userInfo = JSON.parse(Buffer.from(admin_id.split('.')[1], 'base64').toString());
             if (userInfo.id_admin == undefined) {
                 res.status(400).json({ message: "Bad request. That user doens't exist." })
             }
            const connection = await getConnection();
            let result = await connection.query('select * from app_admins where id_admin = ?;', userInfo.id_admin)
            const admin_name = result[0].admin_name, surname1 = result[0].surname_1, surname2 = result[0].surname_2, email = result[0].email;
            res.render("admin_update", { admin_id, admin_name, surname1, surname2, email })
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
            verify (admin_id, req)
            userInfo = JSON.parse(Buffer.from(admin_id.split('.')[1], 'base64').toString());
            if (userInfo.id_admin == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const updates = { admin_name, surname_1, surname_2, email, admin_pass }
            if (!admin_name || !surname_1 || !surname_2 || !email || !admin_pass) {
                res.status(400).json({ message: "Son necesarios todos los campos" })
            }
            const connection = await getConnection();
            let result = await connection.query('UPDATE app_admins SET ? WHERE id_admin = ? ', [updates, userInfo.id_admin])
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
            verify (admin_id, req)
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
            const { admin_id,user } = req.params;
            verify (admin_id, req)
            if (user == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from users where id_user = ?;', user)
            const user_name = result[0].user_name, surname1 = result[0].surname_1, surname2 = result[0].surname_2, address = result[0].address, email = result[0].email;
            res.render("admin_editUser", { user, admin_id,user_name, surname1, surname2, address, email })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    updateUser: async (req, res) => {

        try {
           
            const { user_name, surname_1, surname_2, address, email, user_pass } = req.body;
            const { admin_id, user } = req.params;
            verify (admin_id, req)
            const updates = { user_name, surname_1, surname_2, address, email, user_pass }
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
            const { admin_id } = req.params;
            verify (admin_id, req)
            res.render("admin_createAd", {admin_id, message: ""})
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    insertAdmin: async (req, res) => {
        try {
            const { admin_id } = req.params;
            verify (admin_id, req)
            const { admin_name, surname_1, surname_2, email, admin_pass } = req.body;
            const newAdmin = { admin_name, surname_1, surname_2, email, admin_pass }
            console.log(newAdmin)
            const connection = await getConnection();
            //let result = await connection.query('INSERT INTO app_admins (admin_name, surname_1, surname_2, email, admin_pass) VALUES (?) ', newAdmin)
            let result = await connection.query('INSERT INTO app_admins SET ?', newAdmin)
            res.render("admin_createAd", {admin_id, message: "Administrador creado"})
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    checkUser: async (req, res) => {

        try {
            const { user, admin_id } = req.params;
            verify (admin_id, req)

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
    insertUser2:async (req, res) => {
        try {
            const { admin_id } = req.params;
            verify (admin_id, req)
            const { user_name, surname_1, surname_2, address, email, user_pass } = req.body
            const datesUser = { user_name, surname_1, surname_2, address, email, user_pass }
            const connection = await getConnection();
            //let result = await connection.query('INSERT INTO app_admins (admin_name, surname_1, surname_2, email, admin_pass) VALUES (?) ', newAdmin)
            let result = await connection.query("INSERT INTO users SET ?", datesUser)
            res.redirect(`/admin/${admin_id}`);
               
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    allBills: async (req, res) => {

        try {
            
            const { admin_id } = req.params;
            verify (admin_id, req)
            if (admin_id == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const connection = await getConnection();
            let result2 = await connection.query('select * from bills')
            const bills = result2
            res.render("admin_allBills", { admin_id, bills })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    printBill: async (req, res) => {

        try {
            const { id_bill, admin_id } = req.params;
            verify (admin_id, req)
            if (id_bill == undefined) {
                res.status(400).json({ message: "Bad request. That bill doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from bills where id_bill = ?;', id_bill)
            const bill = result[0];
            var item = bill.items.split('#');
            let fecha = bill.bill_date.toLocaleDateString()

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
            //const file = `${filename}`;

            //res.download(filename, {root: `${__dirname}`}); // Set disposition and send it.
            //var stream = fs.createReadStream(`${__dirname}/`);

            //filename = encodeURIComponent(filename);

            //res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
            //res.setHeader('Content-type', 'application/pdf');

            //stream.pipe(res);
            //fs.readFile(__dirname + filename, function (err, data) {
            //    res.contentType("application/pdf");
            //    res.send(data);
            //});

        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    deleteUser: async (req, res) => {

        try {
            const { admin_id, user } = req.params;
            verify (admin_id, req)
            res.render("admin_delete", { admin_id, user })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    confirmDeleteUser: async (req, res) => {

        try {
            const { answer } = req.body;
            const { admin_id, user } = req.params;
            verify (admin_id, req)
            const connection = await getConnection();
            let result = await connection.query("DELETE FROM users WHERE id_user=?", user)       
            console.log("Usuario eliminado") 
            res.redirect(`/admin/${admin_id}/`)
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },
    checkLabs: (req, res) => {
        
        const { admin_id } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', async () => console.log("Conectado a la base de datos"));
        labs.find().exec(async function (err, result) {
            if (err) throw err;
            res.render('admin_labs', { result, admin_id })
        });
    },

    checkStores: (req, res) => {
        
        const { admin_id } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        stores.find().exec(function (err, result) {
            if (err) throw err;
            res.render('admin_stores', { result, admin_id })
        });
    },

    checkdeliveryPoints: (req, res) => {
        
        const { admin_id } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        deliveryPoints.find().exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('admin_deliveryPoints', { result, admin_id })
        });
    },

    findLab: (req, res) => {
        
        const { admin_id, labname } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        labs.find({ 'labName': labname }).exec(function (err, result) {
            if (err) throw err;
            console.log(result[0].city);
            const lab = result[0]
            res.render('admin_labsEdit', { lab, admin_id })
        });
    },

    findStore: (req, res) => {
        const { admin_id, storeName } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        stores.find({ 'storeName': storeName }).exec(function (err, result) {
            if (err) throw err;
            console.log(result[0].city);
            const store = result[0]
            res.render('admin_storesEdit', { store, admin_id })

        });
    },

    findDeliveryPoint: (req, res) => {
        
        const { admin_id, deliveryPoint } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        labs.find({ 'deliveryPoint': deliveryPoint }).exec(function (err, result) {
            if (err) throw err;
            console.log(result[0].city);
            const deliveryPoint1 = result[0]
            res.render('admin_deliveryEdit', { deliveryPoint1, admin_id })
        });
    },

    updateLabs: (req, res) => {
       
        const { admin_id, labname } = req.params;
        verify (admin_id, req)
        const { labName, address, city } = req.body;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        labs.find({ 'labName': labName }).exec(function (err, lab) {
            if (err) throw err;
            lab.labName = name;
            lab.address = address;
            lab.city = city
            lab.save(function (err) {
                if (err) throw err;
                console.log("Actualización correcta");
                res.render('admin_labs', { message: "Actualización correcta", admin_id })
            });
        });
    },

    updateStores: (req, res) => {
       
        const { admin_id, storeName } = req.params;
        verify (admin_id, req)
        const { name, address, city } = req.body;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        stores.find({ 'storeName': storeName }).exec(function (err, store) {
            if (err) throw err;
            store.storeName = name;
            store.address = address;
            store.city = city
            store.save(function (err) {
                if (err) throw err;
                console.log("Actualización correcta");
                res.render('admin_stores', { message: "Actualización correcta", admin_id })
                //mongoose.disconnect();
            });
        });
    },

    updateliveryPoints: (req, res) => {
       
        const { admin_id, deliveryPoint } = req.params;
        verify (admin_id, req)
        const { name, address, city } = req.body;
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        deliveryPoints.find({ 'deliveryPoint': deliveryPoint }).exec(function (err, deliveryPoint1) {
            if (err) throw err;
            deliveryPoint1.deliveryPoint = name;
            deliveryPoint1.address = address;
            deliveryPoint1.city = city
            deliveryPoint1.save(function (err) {
                if (err) throw err;
                console.log("Actualización correcta");
                res.render('admin_deliveryPoints', { message: "Actualización correcta", admin_id })
                //mongoose.disconnect();
            });
        });
    },

    deleteLab: (req, res) => {
        
        const { admin_id, labname } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));

        labs.findOneAndDelete({ 'labName': labname }, (err, res) => {
            if (err) throw err;
            console.log("Borrado correcto");

        })
        res.render("admin_labsDeletion", { admin_id })
        res.end();
    },

    deleteStore: (req, res) => {
        
        const { admin_id, storename } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));

        stores.findOneAndDelete({ 'storename': storename }, (err, res) => {
            if (err) throw err;
            console.log("Borrado correcto");

        })
        res.render("admin_storeDeletion", { admin_id })
        res.end();
    },

    deleteDeliveryPoint: (req, res) => {
        
        const { admin_id, deliveryPoint } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));

        labs.findOneAndDelete({ 'deliveryPoint': deliveryPoint }, (err, res) => {
            if (err) throw err;
            console.log("Borrado correcto");

        })
        res.render("admin_deliveryDeletion", { admin_id })
        res.end();
    },

    insertLabs:  (req, res) => {
        const { admin_id } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        const newLab = new labs ({ 
            labName: req.body.labName,
            address: req.body.address,
            city: req.body.city,
        });
        newLab.save((err) => {
          
            if(err) {
                res.json({message: err.message, type: 'danger'})
            } else{
                console.log("Laboratorio añadido")
                res.redirect(`/admin/${admin_id}/labs`)
                res.end();
            }
        })
    },

    insertDeliveryPoint:  (req, res) => {
        const { admin_id } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        const newDP = new deliveryPoints ({ 
            deliveryPoint: req.body.deliveryPoint,
            address: req.body.address,
            city: req.body.city,
        });
        newDP.save((err) => {
            if(err) {
                res.json({message: err.message, type: 'danger'})
            } else{
                console.log("Punto de recogida añadido")
                res.redirect(`/admin/${admin_id}/deliveryPoints`)
                res.end();
            }
        })
    },

    insertStores:  (req, res) => {
        console.log("ENTRA")
        const { admin_id } = req.params;
        verify (admin_id, req)
        mongoose.connect(process.env.DB_URI_MONGO, { useNewUrlPArser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (error) => console.log("error"));
        db.once('open', () => console.log("Conectado a la base de datos"));
        const newStore = new stores ({ 
            storeName: req.body.storeName,
            address: req.body.address,
            city: req.body.city,
        });
        newStore.save((err) => {
          
            if(err) {
                res.json({message: err.message, type: 'danger'})
            } else{
                console.log("Laboratorio añadido")
                res.redirect(`/admin/${admin_id}/stores`)
                res.end();
            }
        })
    },

    allSales: async (req, res) => {

        try {
           
            const { admin_id } = req.params;
            verify (admin_id, req)
            const connection = await getConnection();
            let result = await connection.query("select * from sales");
            const sales = result
            res.render("admin_allSales", { sales, admin_id })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    allservices: async (req, res) => {

        try {
           
            const { admin_id } = req.params;
            verify (admin_id, req)
            const connection = await getConnection();
            let result = await connection.query("select * from services");
            const services = result
            console.log(services)
            res.render("admin_allServices", { services, admin_id })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },


}


module.exports = adminController;