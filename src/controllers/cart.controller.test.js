const {
  getCart,
  addToCart,
  updateCartItem,
  updateQuantity,
  removeFromCart
} = require('../controllers/cart.controller');

jest.mock('../repository/cart.repository');

const cartRepo = require('../repository/cart.repository');

describe('getCart', () => {
  it('should return cart items', async () => {
    cartRepo.getAll.mockResolvedValue([{ productId: 1, quantity: 2 }]);

    const result = await getCart();

    expect(result).toEqual([{ productId: 1, quantity: 2 }]);
  });
});

describe('addToCart', () => {
  it('should add item to cart', async () => {
    cartRepo.add.mockResolvedValue({ productId: 1, quantity: 2 });

    const result = await addToCart({
      productId: 1,
      quantity: 2
    });

    expect(result).toEqual({ productId: 1, quantity: 2 });
  });

  it('should fail if missing fields', async () => {
    await expect(addToCart({}))
      .rejects.toThrow("Missing productId or quantity");
  });
});

describe('updateCartItem', () => {
  it('should update cart item', async () => {
    cartRepo.update.mockResolvedValue(true);

    const result = await updateCartItem(1, { quantity: 3 });

    expect(result).toEqual({
      message: "Cart item updated successfully"
    });
  });
});

describe('updateQuantity', () => {
  it('should update quantity', async () => {
    cartRepo.updateQuantity.mockResolvedValue(true);

    const result = await updateQuantity(1, 5);

    expect(result).toEqual({
      message: "Quantity updated successfully"
    });
  });
});

describe('removeFromCart', () => {
  it('should remove item from cart', async () => {
    cartRepo.delete.mockResolvedValue(true);

    const result = await removeFromCart(1);

    expect(result).toEqual({
      message: "Item removed from cart"
    });
  });
});