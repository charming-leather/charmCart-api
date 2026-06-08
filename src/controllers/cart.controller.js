const Error = require("../errors/apiError");
const database = require("../repository/cart.repository");

exports.getCart = async () => {
  return await database.getAll();
};

exports.addToCart = async (item) => {
  if (!item.productId || !item.quantity) {
    throw Error.badRequest("Missing productId or quantity");
  }

  return await database.add(item);
};

exports.updateCartItem = async (productId, data) => {
  const updated = await database.update(productId, data);

  if (!updated) {
    throw Error.notFound("Cart item not found");
  }

  return { message: "Cart item updated successfully" };
};

exports.updateQuantity = async (productId, quantity) => {
  if (!quantity || quantity < 1) {
    throw Error.badRequest("Invalid quantity");
  }

  const updated = await database.updateQuantity(productId, quantity);

  if (!updated) {
    throw Error.notFound("Cart item not found");
  }

  return { message: "Quantity updated successfully" };
};

exports.removeFromCart = async (productId) => {
  const deleted = await database.delete(productId);

  if (!deleted) {
    throw Error.notFound("Cart item not found");
  }

  return { message: "Item removed from cart" };
};