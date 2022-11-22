const getConnection = require('./../ddbb/mysql')

//Consulta de datos en mySQL
const userPayPage = async (req, res) => {
    try {
        res.render('user_pay')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    userPayPage
} 