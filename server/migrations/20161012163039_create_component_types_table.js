exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('component_types', function (table) {
      table.increments();
      table.uuid('uuid');
      table.string('name');
      table.string('type');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('component_types')
  ]);
};
