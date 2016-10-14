
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('modules', function (table) {
      table.increments();
      table.uuid('uuid');
      table.string('name');
      table.string('description');
      table.string('key');
      table.string('value');
      table.integer('port');
      table.boolean('status');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('modules')
  ]);
};
