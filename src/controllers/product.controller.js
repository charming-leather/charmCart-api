const { ApiError: Error } = require("../errors/apiError");
const database = require("../repository/product.repository");

exports.getProductById = async (id) => {
  const product = await database.getById(id);

  if (!product) {
    throw Error.notFound("Product not found");
  }

  return product;
};

exports.getAllProducts = async () => {
  return await database.getAll();
};

exports.createProduct = async (product) => {
  if (!product.name || !product.price) {
    throw Error.badRequest(
      "Missing required fields: name or price"
    );
  }

  return await database.add(product);
};

exports.updateProduct = async (id, productData) => {
  if (!productData.name || !productData.price) {
    throw Error.badRequest(
      "Missing required fields: name or price"
    );
  }

  const updated = await database.update(id, productData);

  if (!updated) {
    throw Error.notFound("Product not found");
  }

  return {
    message: "Product updated successfully"
  };
};

exports.deleteProduct = async (id) => {
  const deleted = await database.delete(id);

  if (!deleted) {
    throw Error.notFound("Product not found");
  }

  return {
    message: "Product deleted successfully"
  };
};