const express = require ('express')

const productsRoute = require ('./products.router')
const cartRoute = require ('./cart.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/products', productsRoute)
app.use('/api/cart', cartRoute)




app.listen(8080, () => {
    console.log('Servidor listo')
})