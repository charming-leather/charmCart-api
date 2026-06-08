const { ApiError: Error } = require("../errors/apiError");
const orderDatabase = require("../repository/order.repository");

function formatMessage(order) {
  let message = `🛍️ NEW ORDER\n\n`;
  message += `Order ID: ${order.id}\n`;
  message += `Customer: ${order.customerName}\n`;
  message += `Contact: ${order.contactNumber}\n`;
  message += `Address: ${order.address}\n\n`;

  message += `Items:\n`;

  order.items.forEach((item, index) => {
    message += `${index + 1}. Product ID: ${item.productId} | Qty: ${item.quantity}\n`;
  });

  message += `\nTotal: R${order.total}\n`;
  message += `Status: ${order.status || "pending"}\n`;

  return message;
}

function createWhatsAppLink(message) {
  const phoneNumber = "27XXXXXXXXX"; // store owner number
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

exports.generateMessage = async (data) => {
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
};

exports.getWhatsAppLink = async (orderId) => {
  const order = await orderDatabase.getById(orderId);

  if (!order) {
    throw Error.notFound("Order not found");
  }

  const message = formatMessage(order);
  const link = createWhatsAppLink(message);

  return {
    whatsappLink: link
  };
};