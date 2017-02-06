
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 3')
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'person_'
        }),
        knex('users').insert({
          id: 2,
          username: 'sparticus'
        }),
      ]);
    });
};
