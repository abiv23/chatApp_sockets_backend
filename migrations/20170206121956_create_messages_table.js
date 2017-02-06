
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.string('content');
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
