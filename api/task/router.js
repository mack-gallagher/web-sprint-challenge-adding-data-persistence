// build your `/api/tasks` router here

const express = require('express');
const Task = require('./model');

const { validateTask } = require('./middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Task.getAll()
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        result[i].task_completed?result[i].task_completed=true:result[i].task_completed=false;
      }
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }) 
});

router.post('/', (req, res) => {
  Task.insert(req.body)
    .then(result => {
      result.task_completed?result.task_completed=true:result.task_completed=false;
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

module.exports = router;
