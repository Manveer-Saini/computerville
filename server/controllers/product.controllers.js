const Product = require('../models/product.models');

const jwt = require('jsonwebtoken');
const twilio = require('twilio');
require('dotenv').config();

const productOrderShipped = (theProduct) => {
    const client = new twilio(process.env.accountSid, process.env.authToken);

    console.log("This is inside of productOrderShipped", theProduct);
    let userPhoneNumber = "+1" + theProduct.phone;

    client.messages
    .create({
        body: 'Your custom Excelsior PC will arrive in 3-4 business days. Thank you for ordering with Computerville.',
        to: userPhoneNumber, // Text this number
        from: process.env.twilioNumber, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}


module.exports = {
    getAllProducts: (req, res) => {
        Product.find()
            .populate("user_id")
            .populate("cpu_id")
            .populate("gpu_id")
            .populate("memory_id")
            .populate("color_id")
            .populate("os_id")
            .populate("storage_id")
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
        console.log("This is createProduct in the backend for payload", decodedJwt.payload.user_id);
        newProduct.user_id = decodedJwt.payload.user_id;
        console.log("This in createProduct in the backend", newProduct);
        Product.create(newProduct)
            .then((product) => {
                console.log(product);
                res.json(product);
                
                // productOrderShipped(product);

            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    sendShippingMessage: (req, res) => {
        productOrderShipped(req.body);
    }
}