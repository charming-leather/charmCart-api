const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');

router.post('/', async (req, res, next) => {
  try {
    const result = await checkoutController.completeCheckout(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:reference', async (req, res, next) => {
  try {
    const result = await checkoutController.getCheckoutByReference(req.params.reference);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;