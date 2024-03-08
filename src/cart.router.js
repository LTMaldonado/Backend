const { Router } = require('express')

const router = Router()

const carts = []



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
})