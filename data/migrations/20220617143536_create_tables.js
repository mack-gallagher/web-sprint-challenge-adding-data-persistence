/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl
        .increments('project_id');
      tbl
        .varchar('project_name')
        .notNullable();
      tbl
        .varchar('project_description');
      tbl
        .integer('project_completed')
        .defaultTo(0);
    })
    .createTable('resources', tbl => {
      tbl
        .increments('resource_id');
      tbl
        .varchar('resource_name')
        .unique()
        .notNullable();
      tbl 
        .varchar('resource_description');
    })
    .createTable('tasks', tbl => {
      tbl
        .increments('task_id');
      tbl
        .integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects');
      tbl
        .varchar('task_description')
        .notNullable();
      tbl
        .varchar('task_notes');
      tbl
        .integer('task_completed')
        .defaultTo(0);
    })
    .createTable('resource_assignments', tbl => {
      tbl
        .increments('assignment_id');
      tbl
        .integer('resource_id')
        .notNullable()
        .references('resource_id')
        .inTable('resources');
      tbl
        .integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects');
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('resource_assignments')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
