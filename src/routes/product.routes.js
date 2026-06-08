const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', async (req, res, next) => {
  try {
    const products = await productController.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await productController.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await productController.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await productController.updateProduct(
      req.params.id,
      req.body
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await productController.deleteProduct(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;