
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, user_id: 1, item_text: 'Bake a cake', status: 'today', priority: 0},
        {id: 2, user_id: 1, item_text: 'Mow the grass', status: 'today', priority: 1},
        {id: 3, user_id: 1, item_text: 'Clean the bathroom', status: 'today', priority: 2},
        {id: 4, user_id: 1, item_text: 'Finish the capstone', status: 'someday', priority: 0},
        {id: 5, user_id: 1, item_text: 'Wash the car', status: 'someday', priority: 1},
        {id: 6, user_id: 1, item_text: 'Start a company', status: 'someday', priority: 2}
      ])
      .then(() => {
        return knex.raw(
          `SELECT setval('items_id_seq', (SELECT MAX(id) FROM items));`
        );
      })
    });
};
