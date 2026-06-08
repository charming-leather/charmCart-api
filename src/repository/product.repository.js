let products = [
  {
    id: 1,
    name: "Leather Wallet",
    price: 850,
    category: "Accessories",
    stock: 15,
    description: "Premium genuine leather wallet",
    brand: "CharmCart"
  },
  {
    id: 2,
    name: "Leather Belt",
    price: 450,
    category: "Accessories",
    stock: 25,
    description: "Durable leather belt for daily wear",
    brand: "CharmCart"
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 3500,
    category: "Bags",
    stock: 8,
    description: "Stylish leather backpack for travel and work",
    brand: "CharmCart"
  },
  {
    id: 4,
    name: "Leather Shoes",
    price: 750,
    category: "Footwear",
    stock: 10,
    description: "Handcrafted formal leather shoes",
    brand: "CharmCart"
  }
];

exports.getById = async (id) => {
  return products.find(product => product.id == id);
};

exports.getAll = async () => {
  return products;
};

exports.add = async (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product
  };

  products.push(newProduct);

  return newProduct;
};

exports.update = async (id, productData) => {
  const index = products.findIndex(product => product.id == id);

  if (index === -1) {
    return false;
  }

  products[index] = {
    id: Number(id),
    ...productData
  };

  return true;
};

exports.delete = async (id) => {
  const index = products.findIndex(product => product.id == id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);

  return true;
};