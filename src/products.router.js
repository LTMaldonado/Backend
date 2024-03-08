const { Router, json } = require('express')
const fs = require('fs')
const router = Router()

const productsJSON = fs.readFileSync('./products.json')



const generateId = () => {
    const products = JSON.parse(productsJSON)
    const id = Math.random() * 100
    while (products.filter(p => p.id === id)) {
        id = Math.random() * 100
    }
    return id
}




router.get('/', (req, res) => {
    const products = JSON.parse(productsJSON)
    const limitToFilter = req.query.limit
    const productsLimited = products.slice(0, limitToFilter)

    res.json(productsLimited)
})




router.get('/:id', (req, res) => {
    const products = JSON.parse(productsJSON)
    const productId = req.params.id

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0 ) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
     }


    res.json(products[productIndex])
})




router.post('/', (req, res) => {
    const products = JSON.parse(productsJSON)
    const product = req.body

    const campos = Object.values(product)

    if(campos.some(v => v === undefined)) {
        res.json({status: {error}, error: 'Faltan campos del producto'})
        return
    }
    if(product.find(p => p.code === product.code)){
        res.json({status: 'error', error: 'Error, codigo repetido'})
        return
    }

    product.id = generateId()

    products.push(product)
    const productsToJSON = JSON.stringify(products)

    fs.writeFileSync('./products.json', productsToJSON)
    res.json({status: 'success', product})

})





router.put('/:id', (req, res) => {
    const products = JSON.parse(productsJSON)
    const uploadedProduct = req.body
    const productId = req.params.id
    delete uploadedProduct.id

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
    }

    products[productIndex] = {...products[productIndex], ...uploadedProduct}

    const productsToJSON = JSON.stringify(products)
    fs.writeFileSync('./products.json', productsToJSON)

    res.json({status: 'success', product: products[productIndex]})

})





router.delete('/:id', (req, res) => {
    const products = JSON.parse(productsJSON)
    const productId = req.params.id

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
    }

    products.splice(productIndex, 1)

    const productsToJSON = JSON.stringify(products)
    fs.writeFileSync('./products.json', productsToJSON)

    res.json({status: 'success', mensaje: 'Producto eliminado'})
})


