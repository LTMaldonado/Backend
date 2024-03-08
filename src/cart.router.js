const { Router } = require('express')
const fs = require ('fs')
const router = Router()

const cartsJSON = fs.readFileSync('./cart.json')
const carts = JSON.parse(cartsJSON)
const products = JSON.parse(fs.readFileSync('./products.json'))


const generateId = () => {
    const id = Math.random() * 100
    while (carts.filter(p => p.id === id)) {
        id = Math.random() * 100
    }
    return id
}

router.post('/', (req, res) => {
    const cart = {
        id: generateId(),
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

router.post('/cid/products/id', (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.id

    const cartIndex = carts.findIndex(c => c.id === cartId)
    const addedProduct = products.find(p => p.id === productId)

    if(cartIndex < 0 || addedProduct < 0) {
        res.json({status: 'error', error: 'Operacion invalida'})
        return
    }

    
})