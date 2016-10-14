exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('system_types', function (table) {
      table.increments();
      table.uuid('uuid');
      table.string('name');
      table.string('handle');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('system_types')
  ]);
};
