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

  const checkout = {
    reference,
    ...checkoutData,
    date: new Date()
  };


  await database.add(checkout);

  
  await orderDatabase.add({
    customerName: checkoutData.customerName,
    items: checkoutData.items,
    total: checkoutData.total,
    reference,
    status: "pending"
  });

  // Clear cart after checkout
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