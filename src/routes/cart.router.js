const { Router } = require('express')
const fs = require ('fs')
const router = Router()
const manager = require('../manager')

const cartsJSON = fs.readFileSync('./cart.json')
const carts = JSON.parse(cartsJSON)
const products = JSON.parse(fs.readFileSync('./products.json'))





router.post('/', (req, res) => {
    const cart = {
        id: manager.generateId(),
        products: []
    }
    res.json(cart)
})

router.get ('/:cid', (req, res) => {
    const cartId = req.params.cid
    const cartIndex = carts.findIndex(c => c.id === cartId)

    if(cartIndex < 0 ) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
     }
    const listProducts = carts[cartIndex].products

    res.json(listProducts)
})

router.post('/cid/products/id', async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.id)

    const cartIndex = carts.findIndex(c => c.id === cartId)
    const productIndex = products.findIndex(p => p.id === productId)


    await manager.addProductToCart(cartIndex, productIndex)
    
    res.json(carts[cartIndex])
    
})

module.exports = router