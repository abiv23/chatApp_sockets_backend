
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE messages_id_seq RESTART WITH 5')
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('messages').insert({
          id: 1,
          room_id: 1,
          user_id: 1,
          content: 'not a bad page!'
        }),
        knex('messages').insert({
          id: 2,
          room_id: 1,
          user_id: 2,
          content: 'test one two three.'
        }),
        knex('messages').insert({
          id: 3,
          room_id: 2,
          user_id: 1,
          content: 'coffee time!'
        }),
        knex('messages').insert({
          id: 4,
          room_id: 2,
          user_id: 2,
          content: 'who is here?'
        })
      ]);
    });
};
