
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rooms', (table) => {
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('rooms');
};
