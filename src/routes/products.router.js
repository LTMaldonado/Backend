const { Router, json } = require('express')
const fs = require('fs')
const router = Router()
const manager = require('../manager')

const productsJSON = fs.readFileSync('./products.json')
const products = JSON.parse(productsJSON)




router.get('/', (req, res) => {
    
    const limitToFilter = parseInt(req.query.limit)
    const productsLimited = products.slice(0, limitToFilter)

    res.json(productsLimited)
})




router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id)

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0 ) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
     }


    res.json(products[productIndex])
})




router.post('/', async (req, res) => {
   try {const product = req.body

    const codigo = product.code
    const campos = Object.values(product)

    product.id = await manager.addProduct(campos, codigo)

     

    products.push(product)
    const productsToJSON = JSON.stringify(products, null, '\t')

    await fs.promises.writeFile('./products.json', productsToJSON)
    res.json({status: 'success', product})
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
})




router.put('/:id', async (req, res) => {
    const uploadedProduct = req.body
    const productId = parseInt(req.params.id)
    delete uploadedProduct.id

    const productIndex = products.findIndex(p => p.id === productId)
    
    if(productIndex < 0) {
        console.log(productIndex)
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
    }

    products[productIndex] = {...products[productIndex], ...uploadedProduct}

    const productsToJSON = JSON.stringify(products)
    await fs.promises.writeFile('./products.json', productsToJSON)

    res.json({status: 'success', product: products[productIndex]})

})





router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id)

    const productIndex = products.findIndex(p => p.id === productId)

    if(productIndex < 0) {
        res.json({status: 'error', error: 'Producto no encontrado'})
        return
    }


    await manager.deteleProduct(productIndex)

    res.json({status: 'success', mensaje: 'Producto eliminado'})
})


module.exports = router