let orders = [];

exports.getAll = async () => {
  return orders;
};

exports.getById = async (id) => {
  return orders.find(o => o.id == id);
};

exports.add = async (order) => {
  const newOrder = {
    id: orders.length + 1,
    status: "pending",
    ...order
  };

  orders.push(newOrder);

  return newOrder;
};

exports.updateStatus = async (id, status) => {
  const order = orders.find(o => o.id == id);

  if (!order) return false;

  order.status = status;

  return true;
};