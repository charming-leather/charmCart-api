let cart = [];

exports.getAll = async () => {
  return cart;
};

exports.add = async (item) => {
  cart.push(item);
  return item;
};

exports.getById = async (productId) => {
  return cart.find(item => item.productId == productId);
};

exports.update = async (productId, data) => {
  const index = cart.findIndex(item => item.productId == productId);

  if (index === -1) return false;

  cart[index] = { ...cart[index], ...data };

  return true;
};

exports.updateQuantity = async (productId, quantity) => {
  const item = cart.find(i => i.productId == productId);

  if (!item) return false;

  item.quantity = quantity;

  return true;
};

exports.delete = async (productId) => {
  const index = cart.findIndex(item => item.productId == productId);

  if (index === -1) return false;

  cart.splice(index, 1);

  return true;
};

exports.clear = async () => {
  cart = [];
};