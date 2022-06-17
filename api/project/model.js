// build your `Project` model here
const db = require('../../data/dbConfig');

function getAll () {
  return db('projects');
}

function getById(id) {
  return db('projects')
    .where({ 'project_id': id })
    .first();
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return getById(ids[0]);
    })
}

module.exports = { getAll, insert };
