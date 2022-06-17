const validateTask = function(req, res, next) {
  if (!req.body.hasOwnProperty('task_description')
      || !req.body.hasOwnProperty('project_id')) {
    res.status(400).json({ message: 'invalid task' });
    return;
  }

  if (req.body.task_completed === 'false' || req.body.task_completed === false) {
    req.body.task_completed = 1;
  } else if (req.body.task_completed === 'true' || req.body.task_completed === true) {
    req.body.task_completed = 1;
  } else {
    res.status(400).json({ message: 'invalid task' });
    return;
  }

  req.body.project_id = parseInt(req.body.project_id);

  next();
}

module.exports = { validateTask };
