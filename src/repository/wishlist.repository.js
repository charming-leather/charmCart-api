let wishlist = [];

exports.getAll = async () => {
  return wishlist;
};

exports.add = async (item) => {
  wishlist.push(item);
  return item;
};

exports.getById = async (productId) => {
  return wishlist.find(item => item.productId == productId);
};

exports.delete = async (productId) => {
  const index = wishlist.findIndex(item => item.productId == productId);

  if (index === -1) return false;

  wishlist.splice(index, 1);

  return true;
};