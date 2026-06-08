const { ApiError: Error } = require("../errors/apiError");
const database = require("../repository/wishlist.repository");
const cartDatabase = require("../repository/cart.repository");

exports.getWishlist = async () => {
  return await database.getAll();
};

exports.addToWishlist = async (item) => {
  if (!item.productId) {
    throw Error.badRequest("Missing productId");
  }

  return await database.add(item);
};

exports.removeFromWishlist = async (productId) => {
  const deleted = await database.delete(productId);

  if (!deleted) {
    throw Error.notFound("Wishlist item not found");
  }

  return { message: "Item removed from wishlist" };
};

exports.moveToCart = async (productId) => {
  const item = await database.getById(productId);

  if (!item) {
    throw Error.notFound("Wishlist item not found");
  }

  await cartDatabase.add({
    productId: item.productId,
    quantity: 1
  });

  await database.delete(productId);

  return { message: "Item moved to cart successfully" };
};