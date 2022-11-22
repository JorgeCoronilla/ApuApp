const getConnection = require('./../ddbb/mysql')

//Consulta de datos en mySQL
const adminPayPage = async (req, res) => {
    try {
        res.render('admin_pay')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    adminPayPage
} 