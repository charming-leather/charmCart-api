const {
  completeCheckout,
  getCheckoutByReference
} = require('../controllers/checkout.controller');

jest.mock('../repository/checkout.repository');
jest.mock('../repository/order.repository');
jest.mock('../repository/cart.repository');

const checkoutRepo = require('../repository/checkout.repository');

describe('completeCheckout', () => {
  it('should complete checkout and return reference', async () => {
    checkoutRepo.add.mockResolvedValue(true);

    const result = await completeCheckout({
      customerName: "Aneesah",
      contactNumber: "0123456789",
      address: "Durban",
      items: [{ productId: 1, quantity: 2 }],
      total: 500
    });

    expect(result.message).toBe("Checkout completed successfully");
    expect(result.reference).toBeDefined();
  });

  it('should fail if missing fields', async () => {
    await expect(completeCheckout({}))
      .rejects.toThrow("Missing required checkout fields");
  });
});

describe('getCheckoutByReference', () => {
  it('should return checkout data', async () => {
    checkoutRepo.getByReference.mockResolvedValue({
      reference: "CHK-123"
    });

    const result = await getCheckoutByReference("CHK-123");

    expect(result).toEqual({
      reference: "CHK-123"
    });
  });
});