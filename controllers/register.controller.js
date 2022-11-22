const getConnection = require("../ddbb/mysql")
var bcrypt = require("bcryptjs");
const { json } = require("express");

const Register = {

    start: async (req, res) => {
        res.render("../views/userRegister.ejs", { message: "" });
    },

    //VOLVEMOS A LA PANTALLA DE INICIO UNA VEZ REGISTRADO
    index: async (req, res) => {
        res.render("../views/login.ejs");

    },

    //INSERTAMOS USUARIOS
    insertUser: async (req, res) => {
        //await getConnection()
        const { user_name, surname_1, surname_2, address, email, user_pass } = req.body
        try {
            const userId = await addUser(user_name, surname_1, surname_2, address, email, user_pass)
            if (userId) {
                res.render("registerConfirmed", { user_name });
                // res.render("login");
            }
        } catch (error) {
            if (user_name == "" || surname_1 == "" || surname_2 == "" || address == "" || email == "" || user_pass == "") {
                res.render("userRegister", { message: "Todos los campos son obligatorios" });

            } else if (error == "ER_DUP_ENTRY") { //ES EL MENSAJE QUE NOS DA LA CONSOLA CUANDO EL REGISTRO DEL CORREO ESTÁ DUPLICADO EN LA BASE DE DATOS.
                res.render("userRegister", { message: "El correo introducido ya existe.Por favor introduzca uno válido" });

                // res.status(400).json({ message: "El correo electrónico introducido ya existe.Por favor introduzca uno válido" })
            }
        }
    },



    map: async (req, res) => {
        res.render("map");

    }




    /*
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
    */
}




//CREAMOS UNA FUNCIÓN PARA ENCRIPTAR LA CONTRASEÑA.
// const encryptUserPass = async (textPlain) => {
//     const hash = await bcrypt.hash(textPlain, 10)
//     return hash
// }


//CREAMOS FUNCION PARA AÑADIR USUARIO.
const addUser = async (user_name, surname_1, surname_2, address, email, user_pass) => {

    const connection = await getConnection()
    // const passwordEncrypted = await encryptUserPass(user_pass)
    const datesUser = { user_name, surname_1, surname_2, address, email, user_pass}
    //HACEMOS PROMESA "MANUAL".SI LO INSERTA SALE POR RESOLVE Y LO ENVÍA A "INSERTEUSER" ,Y SI FALLA SALE POR REJECT.
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users SET ?", datesUser, (error, results) => {
            if (error) {
                return reject(error.code)
            }
            const response = JSON.parse(JSON.stringify(results))
            resolve(response.insertId)
        })
    })

}



module.exports = Register
