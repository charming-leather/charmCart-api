const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsapp.controller');

router.post('/generate', async (req, res, next) => {
  try {
    const result = await whatsappController.generateMessage(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const result = await whatsappController.getWhatsAppLink(req.params.orderId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;