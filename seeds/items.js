
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, item_text: 'Bake a cake', status: 'active', source: 'manual'},
        {id: 2, item_text: 'Mow the grass', status: 'active', source: 'manual'},
        {id: 3, item_text: 'Clean the bathroom', status: 'active', source: 'manual'}
      ])
      .then(() => {
        return knex.raw(
          `SELECT setval('items_id_seq', (SELECT MAX(id) FROM items));`
        );
      })
    });
};
