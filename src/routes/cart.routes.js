const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/', async (req, res, next) => {
  try {
    const cart = await cartController.getCart();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await cartController.addToCart(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const updated = await cartController.updateCartItem(
      req.params.productId,
      req.body
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.patch('/:productId/quantity', async (req, res, next) => {
  try {
    const result = await cartController.updateQuantity(
      req.params.productId,
      req.body.quantity
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const result = await cartController.removeFromCart(req.params.productId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;