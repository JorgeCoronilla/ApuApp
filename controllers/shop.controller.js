const getConnection = require('./../ddbb/mysql')

//Consulta de datos en mySQL
const getProducts = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = "SELECT * FROM products"
        const result = await connection.query(query)
        console.log(result)
        res.render('shop', { result })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getProducts
} 