let checkouts = [];

exports.add = async (request) => {
  const newRequest = {
    id: "REQ-" + Date.now(),
    ...request,
    createdAt: new Date()
  };

  checkouts.push(newRequest);
  return newRequest;
};

exports.getByReference = async (reference) => {
  return checkouts.find(c => c.reference == reference);
};

exports.getAll = async () => {
  return checkouts;
};

exports.clear = async () => {
  checkouts = [];
};