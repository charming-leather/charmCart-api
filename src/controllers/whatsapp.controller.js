const { ApiError: Error } = require("../errors/apiError");
const orderDatabase = require("../repository/order.repository");
require("dotenv").config();

function formatMessage(order) {
  let message = `NEW LEATHER ORDER RECEIVED\n\n`;

  message += `ORDER DETAILS\n`;
  message += `Order ID: ${order.id}\n`;
  message += `Status: ${order.status || "Pending"}\n\n`;

  message += `CUSTOMER DETAILS\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Contact: ${order.contactNumber}\n`;
  message += `Address: ${order.address}\n\n`;

  message += `PRODUCTS ORDERED\n`;

  order.items.forEach((item, index) => {
    message += `${index + 1}. ${item.productName || "Leather Product"}\n`;
    message += `   • Product ID: ${item.productId}\n`;
    message += `   • Quantity: ${item.quantity}\n`;
    message += `   • Unit Price: R${item.price || 0}\n`;
    message += `   • Subtotal: R${(item.price || 0) * item.quantity}\n\n`;
  });

  message += `ORDER TOTAL\n`;
  message += `Total: R${order.total}\n\n`;

  message += `Thank you for choosing our genuine leather products.\n`;
  message += `We will process your order shortly.`;

  return message;
}

function createWhatsAppLink(message) {
  const phoneNumber = process.env.WHATSAPP_NUMBER;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

async function generateMessage(data) {
  if (!data.orderId) {
    throw Error.badRequest("Missing orderId");
  }

  const order = await orderDatabase.getById(data.orderId);

  if (!order) {
    throw Error.notFound("Order not found");
  }

  const message = formatMessage(order);
  const link = createWhatsAppLink(message);

  return {
    message,
    whatsappLink: link
  };
}

async function getWhatsAppLink(orderId) {
  const order = await orderDatabase.getById(orderId);

  if (!order) {
    throw Error.notFound("Order not found");
  }

  const message = formatMessage(order);
  const link = createWhatsAppLink(message);

  return {
    whatsappLink: link
  };
}

module.exports = {
  generateMessage,
  getWhatsAppLink
};