const getConnection = require('../ddbb/mysql')
const adminController = {
    dashAdmin: async (req, res) => {

        try {
            const { admin_id } = req.params;
            if (admin_id == undefined) {
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
           
    const {admin_name, surname_1, surname_2, email, admin_pass} = req.body;
    const {admin_id} = req.params;
    const updates = { admin_name, surname_1, surname_2, email, admin_pass}
            if (!admin_name || !surname_1 || !surname_2 || !email || !admin_pass ) {
                res.status(400).json({ message: "Son necesarios todos los campos" })
            }
            const connection = await getConnection();
            let result = await connection.query('UPDATE app_admins SET ? WHERE id_admin = ? ',[updates,admin_id])
            res.status(200).json({ message: "Usuario actualizado" })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    allUsers: async (req, res) => {

        try {
            const {admin_id} = req.params;
            const connection = await getConnection();
            let result = await connection.query("select * from users");
            //console.log(result);
            const users = result
            console.log(users[0].email);
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
            console.log(user);
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
            const {user_name, surname_1, surname_2, address, email, user_pass} = req.body;
            const {user} = req.params;
            const updates = { user_name, surname_1, surname_2, address, email, user_pass}
                    if (!user_name || !surname_1 || !surname_2 || !address || !email || !user_pass ) {
                        res.status(400).json({ message: "Son necesarios todos los campos" })
                    }
                    const connection = await getConnection();
                    let result = await connection.query('UPDATE users SET ? WHERE id_user = ? ',[updates,user])
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
           
    const {admin_name, surname_1, surname_2, email, admin_pass} = req.body;
    const newAdmin = { admin_name, surname_1, surname_2, email, admin_pass}
            if (!admin_name || !surname_1 || !surname_2 || !email || !admin_pass ) {
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

    checkUser:  async (req, res) => {

        try {
            const { user, admin_id} = req.params; 
            console.log(user);
            if (user == undefined) {
                res.status(400).json({ message: "Bad request. That user doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from users where id_user = ?;', user)
            const user_name = result[0].user_name, surname1 = result[0].surname_1, surname2 = result[0].surname_2, address = result[0].address, email = result[0].email;
            
            let result2 = await connection.query('select * from bills where fk_id_user = ?;', user)
            if (result2) {const bills = result2} else {const bills = ""}
            
            res.render("admin_checkUser", { user_name, surname1, surname2, address, email, bills, admin_id })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    printBill:   async (req, res) => {

        try {
            const { id_bill, admin_id} = req.params; 
            if (id_bill == undefined) {
                res.status(400).json({ message: "Bad request. That bill doens't exist." })
            }
            const connection = await getConnection();
            let result = await connection.query('select * from bills where id_bill = ?;', id_bill)
            const bill = result
            res.render("admin_print", { bill, admin_id })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    deleteUser:  async (req, res) => {

        try {
            res.render("admin_delete")
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    confirmDeleteUser:async (req, res) => {

        try {
            const {answer} = req.body;
            if (answer=='yes') {
            const {user, admin_id} = req.params;
                    if (!user || !admin_id) {
                        res.status(400).json({ message: "Lo siento. Ha habido un error" })
                    }
                    const connection = await getConnection();
                    let result = await connection.query('DELETE FROM users SET ? WHERE id_user = ? ',user)
                    res.status(200).json({ message: "Usuario eliminado" })
                } else {
                    res.redirect('/')
                }}
                catch (error) {
                    res.status(500)
                    res.send(error.message)
                }
    }

}

module.exports = adminController;