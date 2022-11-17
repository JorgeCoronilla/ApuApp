const mysql = require('mysql');
const mongoose = require("mongoose");
const modelo = require("../models/ejemplo.model");

const middleEjemplo = {
    ejemploRender: async (req, res) => {
        res.render("../views/login.ejs");
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