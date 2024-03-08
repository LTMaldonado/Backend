/**const fs = require('fs')



class ProductManager {

    #products
    #path

    static #ultimoProducto = 0

    constructor () {
        this.#products = this.getProducts()
        this.#path = './products.json'
    }

    #getNuevoId() {
        const id = ProductManager.#ultimoProducto
        ProductManager.#ultimoProducto++
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

    async addProduct (title, description, price, thumbnail, code, stock) {
        const fileProductsParse = await this.#products

        const product = {
            id: this.#getNuevoId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        const campos = Object.values (product) 

        if(fileProductsParse.find(pr => pr.code === code)) {
            console.log('Error, el codigo ya existe')
            return
        }
        
        if(campos.some(v => v === undefined)) {
                console.log('Error, falta completar un campo')
                return
            }

        fileProductsParse.push (product)

        const fileProducts = JSON.stringify(fileProductsParse, null, '\t')

        await fs.promises.writeFile('./products.json', fileProducts)
    }

    async getProductById (searchId) {
        const fileProductsParse = await this.#products
        if(fileProductsParse.find(pr => pr.id === searchId)) {
            console.log(fileProductsParse[searchId])
        }
        else {
            console.log('Error, ID no encontrada')
        }
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

}

const main = async () => {
    const p1 = new ProductManager
}

const carts = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}]
const generateId = () => {
    let id = Math.floor(Math.random() * 10)
    while (carts.some(p => p.id === id)) {
        console.log(id)
        id = Math.floor(Math.random() * 10)
    }
    console.log(id)
    return id
}

generateId()*/