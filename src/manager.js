const fs = require('fs')



class ProductManager {

    #products
    #carts

    constructor () {
        this.#products = this.getProducts()
        this.#carts = this.getCarts()
    }

    async generateId  ()  {
        //generar un id
        let id = Math.floor(Math.random() * 100)

        //traer el array de productos
        const fileProducts = await this.#products

        //Verificar que no se repita el Id
        while (fileProducts.some( p => p.id === id)) {
            id = Math.floor(Math.random() * 100)
        }
        return id
    }
    async getProducts () {

        try { 
            const fileProducts = await fs.promises.readFile('./products.json')
    
            const fileProductsParse = JSON.parse(fileProducts)
    
            return fileProductsParse
        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }
    async getCarts () {

        try { 
            const fileCarts = await fs.promises.readFile('./cart.json')
    
            const fileCartsParse = JSON.parse(fileCarts)
    
            return fileCartsParse
        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }


    async addProduct (campos, codigo) {
        let nuevoID
        const fileProductsParse = await this.#products


        if(fileProductsParse.find(pr => pr.code === codigo)) {
            throw new Error ('Codigo repetido')
        }
        
        if(campos.some(v => v === undefined)) {
                console.log('Error, falta completar un campo')
                return
            }

        nuevoID = this.generateId()
        return nuevoID
    }

    async updateProduct (update) {
        const fileProductsParse = await this.#products

        const productIDToUpdate = fileProductsParse.findIndex( p => p.id === update.id)

        const updatedProduct = {...fileProductsParse[productIDToUpdate], update}

        fileProductsParse[productIDToUpdate] = updatedProduct
    }

    async deteleProduct (id) {
        const fileProductsParse = await this.#products

        fileProductsParse.splice(id, 1)

        const fileProducts = JSON.stringify(fileProductsParse, null, '\t')

        await fs.promises.writeFile('./products.json', fileProducts)
    }


    async addProductToCart (cartIndex, productIndex) {
        const fileProductsParse = await this.#products
        const fileCartsParse = await this.#carts

        if(cartIndex < 0 || productIndex < 0) {
            throw new Error ('Operacion invalida')
        }

        const thisArrayCart = fileCartsParse[cartIndex].products
        const thisProduct = fileProductsParse[productIndex]
        const indexPInC = thisArrayCart.findIndex(p => p.productID === thisProduct.id)

        if( indexPInC > 0 ){
            thisArrayCart[indexPInC].quantity++           
        }
        else {
            thisArrayCart.push({
                productID: thisProduct.id,
                quantity: 1
            })
        }
        const fileCarts = JSON.stringify(fileCartsParse, null, '\t')
        await fs.promises.writeFile('./cart.json', fileCarts)

    }
}

const manager = new ProductManager


module.exports = manager