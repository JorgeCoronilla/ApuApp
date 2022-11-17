const mysql = require('mysql');
const mongoose = require("mongoose");
const modelo = require("../models/ejemplo.model");

const middleEjemplo = {
    datosAdmin: async (req, res) => {
        const {user} = req.params;
        const mysql = require('mysql');
        const connection = require('../ddbb/mysql')
        let query = 'select * from app_admins where id_admin = 1;';
        connection.query(query, (err, req) => {
            if(err) throw err;
            console.log(req);
            //connection.end();
        });
        res.send("Aquí está" + user );
    },
    ejemploPost: async (req, res) => {
        const { email, password } = req.body;
        if (!email || password) return res.statusMessage(400).send();
        return res.send();
    }, ejemploPatch: async (req, res) => {
        const { user } = req.params;
        res.send();
    },
    ejemploDelete: (req, res) => {
        const {user} =req.params;
        res.send();
    },
    sessionUser: async (req, res) => {
        const { user } = req.params.user;
        if (!user) return res.statusMessage(400).send();
        return res.send();
    },

}

module.exports = middleEjemplo;