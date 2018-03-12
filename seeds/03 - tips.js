
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tips').del()
    .then(function () {
      // Inserts seed entries
      return knex('tips').insert([
        {id: 1, tip_text: "Do it now and you'll feel better"},
        {id: 2, tip_text: 'Success depends on you getting stuff done'},
        {id: 3, tip_text: 'Some other tip for success'}
      ])
      .then(() => {
        return knex.raw(
          `SELECT setval('tips_id_seq', (SELECT MAX(id) FROM tips));`
        );
      })

    });
};
