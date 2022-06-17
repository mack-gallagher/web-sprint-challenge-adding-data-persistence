const validateProject = function(req, res, next) {
  if (!req.body.hasOwnProperty('project_name')) {
    res.status(400).json({ message: 'invalid project' });
    return;
  }

  next();
};

module.exports = { validateProject };
