const {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

jest.mock('../repository/product.repository');

const {
  getById,
  getAll,
  add,
  update,
  delete: mockDelete
} = require('../repository/product.repository');

describe('getProductById', () => {
  const mockProduct = {
    id: 1,
    name: "Leather Wallet",
    price: 200
  };

  it('should return product if found', async () => {
    getById.mockResolvedValue(mockProduct);

    const result = await getProductById(1);

    expect(result).toEqual(mockProduct);
  });

  it('should throw notFound error if product not found', async () => {
    getById.mockResolvedValue(null);

    await expect(getProductById(999))
      .rejects.toThrow("Product not found");
  });
});

describe('getAllProducts', () => {
  const mockProducts = [
    { id: 1, name: "Wallet", price: 200 },
    { id: 2, name: "Belt", price: 150 }
  ];

  it('should return all products', async () => {
    getAll.mockResolvedValue(mockProducts);

    const result = await getAllProducts();

    expect(result).toEqual(mockProducts);
  });
});

describe('createProduct', () => {
  const validProduct = {
    name: "Bag",
    price: 500
  };

  it('should add and return new product', async () => {
    add.mockResolvedValue({ id: 3, ...validProduct });

    const result = await createProduct(validProduct);

    expect(result).toEqual({ id: 3, ...validProduct });
  });

  it('should throw badRequest error if required fields missing', async () => {
    const invalid = { name: "" };

    await expect(createProduct(invalid))
      .rejects.toThrow("Missing required fields");
  });
});

describe('updateProduct', () => {
  const updateData = {
    name: "Updated Bag",
    price: 600
  };

  it('should update product and return success message', async () => {
    update.mockResolvedValue(true);

    const result = await updateProduct(1, updateData);

    expect(result).toEqual({
      message: "Product updated successfully"
    });
  });
});

describe('deleteProduct', () => {
  it('should delete product and return success message', async () => {
    mockDelete.mockResolvedValue(true);

    const result = await deleteProduct(1);

    expect(result).toEqual({
      message: "Product deleted successfully"
    });
  });
});