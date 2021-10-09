const ProductControllers = require(`../controllers/product.controllers`);

module.exports= (app) => {
    app.get('/api/products', ProductControllers.getAllProducts);
    app.post('/api/products', ProductControllers.createProduct);
}