const getConnection = require('./../ddbb/mysql')
var bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const encryptUserPass = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain,10)
    return hash
}

function verify (id_user, req){
    const verified = jwt.verify(id_user, process.env.TOKEN_SECRET)
    req.user = verified;
}
/**
 * @param  {} req
 * @param  {} res
 * @param  {} id_user
 */
const getUser = async (req, res) => {
    try {
        const connection = await getConnection()
        const { id_user } = req.params
        verify (id_user, req)
        userInfo = JSON.parse(Buffer.from(id_user.split('.')[1], 'base64').toString());
         if (userInfo.id_user == undefined) {
             res.status(400).json({ message: "Bad request. That user doens't exist." })
         }
        let decoded_id_user = userInfo.id_user
        const user = await connection.query("SELECT * FROM users WHERE id_user=?", decoded_id_user)
        res.render('userDash', {user, decoded_id_user, id_user})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
/**
 * Funcion para actualizar los datos del usuario en la base de datos
 * @param  {} req
 * @param  {} res
 */
const updateUser = async (req, res) => {
    try {
        const { id_user } = req.params
        req.body = JSON.parse(JSON.stringify(req.body));
        console.log('Este es el req.body: ', req.body)
        const { user_name, surname_1, surname_2, address, email } = req.body

        if (user_name == undefined || surname_1 == undefined || surname_2 == undefined || address == undefined || email == undefined) {
            res.status(400).json({ message: "Bad request. Please fill all fields" })
        }
        const updateUserData = { user_name, surname_1, surname_2, address, email }

        const connection = await getConnection()
        const result = await connection.query("UPDATE users SET ? WHERE id_user=?", [updateUserData, id_user])
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

/**
 * Funcion para actualizar la contraseña del usuario en la base de datos
 * @param  {} req
 * @param  {} res
 */
const updatePass = async (req, res) => {
    try {
        const { id_user } = req.params
        req.body = JSON.parse(JSON.stringify(req.body));
        console.log('Este es el req.body: ', req.body)
        const { user_pass } = req.body
        const passwordEncrypted = await encryptUserPass(user_pass)

        if (user_pass == undefined) {
            res.status(400).json({ message: "Bad request. Please fill all fields" })
        }
        const updateUserPass = { user_pass:passwordEncrypted }

        const connection = await getConnection()
        const result = await connection.query("UPDATE users SET ? WHERE id_user=?", [updateUserPass, id_user])
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

/**
 * Funcion para renderizar el formulario de unsubscription
 * @param  {} req
 * @param  {} res
 */
const unsubscribeForm = async (req, res) => {
    try {
        const connection = await getConnection()
        const { id_user } = req.params
        verify (id_user, req)
        userInfo = JSON.parse(Buffer.from(id_user.split('.')[1], 'base64').toString());
         if (userInfo.id_user == undefined) {
             res.status(400).json({ message: "Bad request. That user doens't exist." })
         }
        let decoded_id_user = userInfo.id_user
        const user = await connection.query("SELECT * FROM users WHERE id_user=?", decoded_id_user)
        res.render('unsubscribe', {user, decoded_id_user,id_user})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

/**
 * Funcion para eliminar los datos del usuario en la base de datos
 * @param  {} req
 * @param  {} res
 */
const deleteUser = async (req, res) => {
    try {
        const { id_user } = req.params
        const connection = await getConnection()
        await connection.query("DELETE FROM users WHERE id_user=?", id_user)
        res.location('/index')
        res.sendStatus(302);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getUser,
    updateUser,
    updatePass,
    unsubscribeForm,
    deleteUser
} 