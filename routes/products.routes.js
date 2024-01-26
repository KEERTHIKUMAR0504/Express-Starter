const express = require('express');
const router = express.Router();

const { addProduct, updateProduct, getProductById, getProducts,  deleteProduct} = require('../controllers/products.controller');
const { isAuth } = require('../utils/authentication');
const { isAdmin } = require('../utils/authorization');

router.get('/products', getProducts);
router.get('/products/:productId', getProductById);
router.post('/products', isAuth, isAdmin, addProduct);
router.put('/products/:productId', isAuth, isAdmin, updateProduct);
router.delete('/products/:productId', isAuth, isAdmin, deleteProduct);

module.exports = router;