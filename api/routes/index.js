const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const users = require('../controllers/user.js');
    const products = require('../controllers/product.js');
    const categories = require('../controllers/category.js');
    const apps = require('../controllers/app.js');
    const stocks = require('../controllers/stock.js');
    const prices = require('../controllers/price.js');

    app.get('/users', middlewareHere, users.list);
    app.post('/user', middlewareHere, users.create);
    app.post('/user/auth', middlewareHere, users.login);
    app.patch('/user', middlewareHere, users.update);
    app.delete('/user', middlewareHere, users.delete);

    app.get('/products', middlewareHere, products.list);
    app.post('/product', middlewareHere, products.create);
    app.patch('/product', middlewareHere, products.update);
    app.delete('/product', middlewareHere, products.delete);

    app.get('/categories', middlewareHere, categories.list);
    app.post('/category', middlewareHere, categories.create);
    app.patch('/category', middlewareHere, categories.update);
    app.delete('/category', middlewareHere, categories.delete);

    app.get('/apps', middlewareHere, apps.list);
    app.post('/app', middlewareHere, apps.create);
    app.patch('/app', middlewareHere, apps.update);
    app.delete('/app', middlewareHere, apps.delete);

    app.get('/stocks', middlewareHere, stocks.list);
    app.post('/stock', middlewareHere, stocks.create);
    app.patch('/stock', middlewareHere, stocks.update);
    app.delete('/stock', middlewareHere, stocks.delete);

    app.get('/prices', middlewareHere, prices.list);
    app.post('/price', middlewareHere, prices.create);
    app.patch('/price', middlewareHere, prices.update);
    app.delete('/price', middlewareHere, prices.delete);


}