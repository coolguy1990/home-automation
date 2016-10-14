
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('components', function (table) {
      table.increments();
      table.uuid('uuid');
      table.integer('type_id').unsigned();
      table.foreign('type_id').references('component_types.id');
      table.boolean('status');
      table.string('description');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('components')
  ]);
};
