const getConnection = require('./../ddbb/mysql')
var bcrypt = require("bcryptjs")

const encryptUserPass = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain,10)
    return hash
}

//Consulta de datos en mySQL
const getUsers = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = "SELECT * FROM users"
        const result = await connection.query(query)
        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const getUser = async (req, res) => {
    try {
        const { id_user } = req.params
        const connection = await getConnection()
        const user = await connection.query("SELECT * FROM users WHERE id_user=?", id_user)
        res.render('userDash', {user, id_user})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

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

const unsubscribeForm = async (req, res) => {
    try {
        const { id_user } = req.params
        const connection = await getConnection()
        const user = await connection.query("SELECT * FROM users WHERE id_user=?", id_user)
        res.render('unsubscribe', {user, id_user})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id_user } = req.params
        const connection = await getConnection()
        const result = await connection.query("DELETE FROM users WHERE id_user=?", id_user)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    updatePass,
    unsubscribeForm,
    deleteUser
} 