const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.get('/', async (req, res, next) => {
  try {
    const wishlist = await wishlistController.getWishlist();
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await wishlistController.addToWishlist(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const result = await wishlistController.removeFromWishlist(req.params.productId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/:productId/move-to-cart', async (req, res, next) => {
  try {
    const result = await wishlistController.moveToCart(req.params.productId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;