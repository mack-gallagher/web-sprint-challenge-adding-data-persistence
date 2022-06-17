// build your `Task` model here
const db = require('../../data/dbConfig');

function getAll() {
  return db('tasks')
    .select('tasks.task_description',
            'tasks.task_id',
            'projects.project_id',
            'tasks.task_notes',
            'projects.project_name',
            'projects.project_description', 
            'tasks.task_completed')
    .join('projects','projects.project_id','=','tasks.project_id');
}

function getById(id) {
  return db('tasks')
    .where({ 'task_id': id })
    .first();
}

function insert(task) {
  return db('tasks')
    .insert(task)
    .then(ids => {
      return db('tasks')
        .where('task_id',ids[0])
        .join('projects','projects.project_id','=','tasks.project_id')
        .first();
    })
}


module.exports = { getAll, insert };
