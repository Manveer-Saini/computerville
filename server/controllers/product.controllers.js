const Product = require('../models/product.models');

const jwt = require('jsonwebtoken');

module.exports = {
    getAllProducts: (req, res) => {
        Product.find()
            .populate("user_id")
            .populate("cpu_id")
            .populate("gpu_id")
            .populate("memory_id")
            .then((allProducts) => {
                console.log(allProducts);
                res.json(allProducts);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createProduct: (req, res) => {
        console.log(req.body);
        const newProduct = new Product(req.body);

        // Decodes cookie for user_id to associate new Product with user.
        const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true});
        newProduct.user_id = decodedJwt.payload.user_id;

        Product.create(newProduct)
            .then((product) => {
                console.log(product);
                res.json(product);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
}