const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require('../controllers/orders.controller');

jest.mock('../repository/order.repository');

const {
  getAll,
  getById,
  add,
  updateStatus
} = require('../repository/order.repository');

describe('getAllOrders', () => {
  it('should return all orders', async () => {
    getAll.mockResolvedValue([{ id: 1 }]);

    const result = await getAllOrders();

    expect(result).toEqual([{ id: 1 }]);
  });
});

describe('getOrderById', () => {
  it('should return order if found', async () => {
    getById.mockResolvedValue({ id: 1 });

    const result = await getOrderById(1);

    expect(result).toEqual({ id: 1 });
  });

  it('should throw error if not found', async () => {
    getById.mockResolvedValue(null);

    await expect(getOrderById(999))
      .rejects.toThrow("Order not found");
  });
});

describe('createOrder', () => {
  it('should create order', async () => {
    const mockOrder = {
      customerName: "Aneesah",
      items: [{ productId: 1, quantity: 2 }],
      total: 500
    };

    add.mockResolvedValue({ id: 1, ...mockOrder });

    const result = await createOrder(mockOrder);

    expect(result).toEqual({ id: 1, ...mockOrder });
  });

  it('should fail if missing fields', async () => {
    await expect(createOrder({}))
      .rejects.toThrow("Missing required order fields");
  });
});

describe('updateOrderStatus', () => {
  it('should update status', async () => {
    updateStatus.mockResolvedValue(true);

    const result = await updateOrderStatus(1, "confirmed");

    expect(result).toEqual({
      message: "Order status updated successfully"
    });
  });
});