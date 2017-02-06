
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE rooms_id_seq RESTART WITH 3')
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('rooms').insert({
          id: 1,
          name: 'www.google.com'
        }),
        knex('rooms').insert({
          id: 2,
          name: 'localhost:3000$'
        })
      ]);
    });
};
