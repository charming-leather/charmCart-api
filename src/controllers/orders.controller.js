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
  if (
    !orderData.customerName ||
    !orderData.contactNumber ||
    !orderData.address ||
    !orderData.items ||
    !orderData.total
  ) {
    throw Error.badRequest("Missing required order fields");
  }

  const newOrder = {
    ...orderData,
    status: "pending",
    createdAt: new Date()
  };

  return await database.add(newOrder);
};

exports.updateOrderStatus = async (id, status) => {
  if (!status) {
    throw Error.badRequest("Status is required");
  }

  const updated = await database.updateStatus(id, status);

  if (!updated) {
    throw Error.notFound("Order not found");
  }

  return {
    message: "Order status updated successfully",
    orderId: id,
    status
  };
};