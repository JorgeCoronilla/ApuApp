const getConnection = require('../ddbb/mysql')

//Recoge los productos del carro
const getCart = async (req, res) => {
    var cartProducts = []
    try {
        const connection = await getConnection()
        const cartIDS = req.params
        const cart = cartIDS.items_ids.split(',')

        for (const element of cart) {
            let product = await connection.query("SELECT * FROM products WHERE id_item=?", element)
            console.log(product)
            cartProducts.push(product[0])
        }
        
        res.render('cart', { cartProducts })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getCart
} 