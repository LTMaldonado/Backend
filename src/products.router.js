const { Router, json } = require('express')

const router = Router()

const products = []



const generateId = () => {
    const id = Math.random() * 100
    while (products.filter(p => p.id === id)) {
        id = Math.random() * 100
    }
    return id
}




router.get('/', (req, res) => {
    const limitToFilter = req.query.limit
    const productsLimited = products.slice(0, limitToFilter)

    res.json(productsLimited)
})




router.get('/:id', (req, res) => {
    const productId = req.params.id

    const productIndex = products.findIndex(p => p.id === productId)

    res.json(products[productIndex])
})




router.post('/', (req, res) => {
    const product = req.body
    const productParseado = JSON.parse(product)

    const campos = Object.values(productParseado)

    if(campos.some(v => v === undefined)) {
        res.json({status: {error}, error: 'Faltan campos del producto'})
        return
    }
    if(productParseado.find(p => p.code === productParseado.code)){
        res.json({status: 'error', error: 'Error, codigo repetido'})
        return
    }

    productParseado.id = generateId()

    products.push(productParseado)

    res.json({status: 'success', productParseado})

})





router.put('/:id', (req, res) => {
    const uploadedProduct = req.body
    const productId = req.params.id
    delete uploadedProduct.id

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
    }

    products[productIndex] = {...products[productIndex], ...uploadedProduct}
})





router.delete('/:id', (req, res) => {
    const productId = req.params.id

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
    }

    products.splice(productIndex, 1)

    res.json({status: 'success', mensaje: 'Producto eliminado'})
})


