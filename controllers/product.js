'use strict'

const Product = require('../models/product')

const mapProduct = (product, body) => {
    product.name = body.name
    product.picture = body.picture
    product.price = body.price
    product.category = body.category
    product.description = body.description
    return product
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) { return res.status(500).send(`Error traer los productos ${err}`) }
        if (!products) { return res.status(404).send(`Productos no encontrados`) }

        res.status(200).send({ products })
    })
}

function getProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) { return res.status(500).send(`Error traer el producto ${err}`) }
        if (!product) { return res.status(404).send('Producto no encontrado') }

        res.status(200).send({ product })
    })
}

function saveProduct(req, res) {
    console.log('POST api/product')
    console.log(req.body)
    let product = new Product()
    product = mapProduct(product, req.body)

    product.save((err, productStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
        }
        res.status(200).send({ product: productStored })
    })
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let body = req.body

    Product.findByIdAndUpdate(productId, body, (err, productUpdated) => {
        if (err) { return res.status(500).send(`Error al actualizar el producto ${err}`) }
        if (!productUpdated) { return res.status(404).send('Producto no encontrado para actualizar') }

        res.status(200).send({ product: productUpdated })
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) { return res.status(500).send(`Error al eliminar el producto ${err}`) }
        if (!product) { return res.status(404).send('Producto a eliminar no encontrado') }

        Product.remove(product, (err) => {
            if (err) { res.status(500).send(`Erro al eliminar el producto ${err}`) }
            res.status(200).send('El producto ha sido eliminado')
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}

