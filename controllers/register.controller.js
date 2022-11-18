const getConnection = require('../ddbb/mysql')
var bcrypt = require("bcryptjs");
const { connection } = require('mongoose');

const Register = {

    //INSERTAMOS USUARIOS
    insertUser: async (req, res) => {
        const connection = await getConnection()
        console.log(req.body)
        const { user_name, surname_1, surname_2, address, email, user_pass } = req.body
        addUser(user_name, surname_1, surname_2, address, email, user_pass)
        res.json("insertado")
        //console.log("Usuario insertado")
    },



    //CONSULTAMOS TODOS LOS DATOS DE LA TABLA USUARIOS
    findAll: async (req, res) => {
        const connection = await getConnection()
        connection.query('SELECT * FROM users', function (err, filas) {
            if (err) {
                throw err;
            } else {
                filas.forEach(fila => {
                    console.log(fila)
                });
            }
        })

    }
}


/*
//INSERTAMOS USUARIOS
const addUser = (user_name, surname_1, surname_2, address, email, user_pass) => {
    const mysql = `INSERT INTO users (id_user,user_name,surname_1,surname_2,address,email,user_pass) VALUES (${null},'${user_name}','${surname_1}','${surname_2}','${address}','${email}','${user_pass}')`
    //let info = {user_name, surname_1, surname_2, address, email, user_pass}
    getConnection.query(mysql, function (err, res) {
        if (err) throw err
        return true
    })

}


*/
const addUser = async (req, res) => {
    
    try {
        const conection = await getConnection()
        const { user_name, surname_1, surname_2, address, email, user_pass } = req.body
        //var salt = bcrypt.genSaltSync(10);
        //var passwordCrypt = bcrypt.hashSync(user_pass,salt)
        const datesUser = { user_name, surname_1, surname_2, address, email, user_pass }
   

        connection.query("INSERT INTO users SET ?", datesUser ,(error,results) => {
            if (error){console.log(error)}
            res.redirect("/")
        })


    } catch (error) {
        console.log("error")
        
    }
}

module.exports = Register