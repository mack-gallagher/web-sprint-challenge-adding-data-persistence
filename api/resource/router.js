// build your `/api/resources` router here

const db = require('../../data/dbConfig');

const express = require('express');
const router = express.Router();

const Resource = require('./model');

const { validateResource } = require('./middleware');

router.get('/', (req, res) => {
  Resource.getAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

router.post('/', validateResource, (req, res) => {
  Resource.insert(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

module.exports = router;
