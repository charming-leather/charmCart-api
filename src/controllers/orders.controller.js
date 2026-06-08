const { ApiError: Error } = require("../errors/apiError");
const database = require("../repository/order.repository");

exports.getAllOrders = async () => {
  return await database.getAll();
};

exports.getOrderById = async (id) => {
  const order = await database.getById(id);

  if (!order) {
    throw Error.notFound("Order not found");
  }

  return order;
};

exports.createOrder = async (orderData) => {
  if (!orderData.customerName || !orderData.items || !orderData.total) {
    throw Error.badRequest("Missing required order fields");
  }

  return await database.add(orderData);
};

exports.updateOrderStatus = async (id, status) => {
  const updated = await database.updateStatus(id, status);

  if (!updated) {
    throw Error.notFound("Order not found");
  }

  return {
    message: "Order status updated successfully"
  };
};