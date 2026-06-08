let checkouts = [];

exports.add = async (checkout) => {
  checkouts.push(checkout);
  return checkout;
};

exports.getByReference = async (reference) => {
  return checkouts.find(c => c.reference == reference);
};