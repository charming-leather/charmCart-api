const { ApiError: Error } = require("../errors/apiError");
const database = require("../repository/checkout.repository");
const orderDatabase = require("../repository/order.repository");
const cartDatabase = require("../repository/cart.repository");

function generateReference() {
  return "CHK-" + Date.now();
}

exports.completeCheckout = async (checkoutData) => {
  if (
    !checkoutData.customerName ||
    !checkoutData.contactNumber ||
    !checkoutData.address ||
    !checkoutData.items ||
    !checkoutData.total
  ) {
    throw Error.badRequest("Missing required checkout fields");
  }

  const reference = generateReference();

 
  const enrichedItems = checkoutData.items.map(item => ({
    productId: item.productId,
    productName: item.productName || "Leather Product",
    price: item.price || 0,
    quantity: item.quantity,
    subtotal: (item.price || 0) * item.quantity
  }));

  const checkout = {
    reference,
    ...checkoutData,
    items: enrichedItems,
    date: new Date()
  };

  await database.add(checkout);

  await orderDatabase.add({
    customerName: checkoutData.customerName,
    contactNumber: checkoutData.contactNumber,
    address: checkoutData.address,
    items: enrichedItems,
    total: checkoutData.total,
    reference,
    status: "pending"
  });

  await cartDatabase.clear();

  return {
    message: "Checkout completed successfully",
    reference
  };
};

exports.getCheckoutByReference = async (reference) => {
  const checkout = await database.getByReference(reference);

  if (!checkout) {
    throw Error.notFound("Checkout not found");
  }

  return checkout;
};