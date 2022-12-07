function responseAPI(res, isError, message, quantity, data) {
  return res.json({
    error: isError,
    message,
    quantity: quantity || 0,
    data: data || null,
  });
}

module.exports = { responseAPI };
