// build your `/api/projects` router here

const express = require('express');
const router = express.Router();

const Project = require('./model');

const { validateProject } = require('./middleware');

router.get('/', (req, res) => {
  Project.getAll()
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        result[i].project_completed?result[i].project_completed=true:result[i].project_completed=false;
      }
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

router.post('/', validateProject, (req, res) => {
  Project.insert(req.body)
    .then(result => {
      result.project_completed?result.project_completed=true:result.project_completed=false;
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

module.exports = router;
