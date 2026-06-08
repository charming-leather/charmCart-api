const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart
} = require('../controllers/wishlist.controller');

jest.mock('../repository/wishlist.repository');
jest.mock('../repository/cart.repository');

const {
  getAll,
  add,
  delete: mockDelete,
  getById
} = require('../repository/wishlist.repository');

const cartRepo = require('../repository/cart.repository');

describe('getWishlist', () => {
  it('should return wishlist items', async () => {
    getAll.mockResolvedValue([{ productId: 1 }]);

    const result = await getWishlist();

    expect(result).toEqual([{ productId: 1 }]);
  });
});

describe('addToWishlist', () => {
  it('should add item to wishlist', async () => {
    add.mockResolvedValue({ productId: 1 });

    const result = await addToWishlist({ productId: 1 });

    expect(result).toEqual({ productId: 1 });
  });

  it('should throw error if productId missing', async () => {
    await expect(addToWishlist({}))
      .rejects.toThrow("Missing productId");
  });
});

describe('removeFromWishlist', () => {
  it('should remove item', async () => {
    mockDelete.mockResolvedValue(true);

    const result = await removeFromWishlist(1);

    expect(result).toEqual({
      message: "Item removed from wishlist"
    });
  });
});

describe('moveToCart', () => {
  it('should move item to cart and delete from wishlist', async () => {
    getById.mockResolvedValue({ productId: 1 });

    cartRepo.add.mockResolvedValue(true);
    mockDelete.mockResolvedValue(true);

    const result = await moveToCart(1);

    expect(result).toEqual({
      message: "Item moved to cart successfully"
    });
  });
});