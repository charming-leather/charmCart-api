const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');

router.get('/', async (req, res, next) => {
  try {
    const orders = await orderController.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await orderController.getOrderById(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const order = await orderController.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const result = await orderController.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;