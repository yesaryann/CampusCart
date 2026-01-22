const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
