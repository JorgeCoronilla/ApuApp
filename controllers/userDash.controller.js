const getConnection = require('./../ddbb/mysql')

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
        console.log(req.params)
        const { id_user } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM users WHERE id_user=?", id_user)
        console.log(result)
        console.log(result[0].id_user)
        console.log(result[0].user_name)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id_user } = req.params
        const { user_name, surname_1, surname_2, address, email } = req.body

        if (user_name == undefined || surname_1 == undefined || surname_2 == undefined || address == undefined || email == undefined) {
            res.status(400).json({ message: "Bad request. Please fill all fields" })
        }
        const updateUser = { user_name, surname_1, surname_2, address, email }

        const connection = await getConnection()
        const result = await connection.query("UPDATE users SET ? WHERE id_user=?", [updateUser, id_user])
        res.json(result)
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
    deleteUser
} 