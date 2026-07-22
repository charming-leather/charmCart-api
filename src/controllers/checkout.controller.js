const { ApiError: Error } = require("../errors/apiError");
const cartDatabase = require("../repository/cart.repository");
const whatsappController = require("./whatsapp.controller");

function generateReference() {
  return "ORD-" + Date.now();
}

/**
 * HOW I WANT MY SYSTEM TO WORK ...DIFFERENT FROM OTHER E-COMMERCE WEB APPS
 * STEP 1: User clicks "Buy"
 * STEP 2: System generates WhatsApp order message
 * STEP 3: Owner receives order and creates it manually
 */
exports.completeCheckout = async (checkoutData) => {
  if (
    !checkoutData.customerName ||
    !checkoutData.contactNumber ||
    !checkoutData.address
  ) {
    throw Error.badRequest("Missing required customer details");
  }

  const cartItems = await cartDatabase.getAll();

  if (!cartItems || cartItems.length === 0) {
    throw Error.badRequest("Cart is empty");
  }

  const enrichedItems = cartItems.map(item => ({
    productId: item.productId,
    productName: item.productName || "Leather Product",
    price: item.price || 0,
    quantity: item.quantity,
    subtotal: (item.price || 0) * item.quantity
  }));

  const total = enrichedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  const orderPreview = {
    id: generateReference(),
    customerName: checkoutData.customerName,
    contactNumber: checkoutData.contactNumber,
    address: checkoutData.address,
    items: enrichedItems,
    total,
    status: "NEW REQUEST (PENDING OWNER)"
  };

  const message = whatsappController["formatMessage"]
    ? whatsappController["formatMessage"](orderPreview)
    : null;

  const whatsappResult = await whatsappController.generateMessage({
    orderId: null,
    manualOrder: orderPreview
  });

  await cartDatabase.clear();

  return {
    message: "Order request sent via WhatsApp successfully",
    reference: orderPreview.id,
    whatsappMessage: message,
    whatsappLink: whatsappResult.whatsappLink
  };
};

/**
 * for later when i add logging!!!!
 */
exports.getCheckoutByReference = async () => {
  return {
    message: "Checkout history not stored in this version (WhatsApp-based system)"
  };
};