
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('component_module_pivot', function (table) {
      table.uuid('uuid');
      table.integer('module_id').unsigned();
      table.integer('component_id').unsigned();
      table.foreign('module_id').references('modules.id');
      table.foreign('component_id').references('components.id');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('component_module_pivot')
  ]);
};
