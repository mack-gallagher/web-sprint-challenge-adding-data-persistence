const validateResource = function(req, res, next) {
  if (!req.body.hasOwnProperty('resource_name')) {
    res.status(400).json({ message: 'invalid resource' });
    return;
  }

  next();
}

module.exports = { validateResource };
