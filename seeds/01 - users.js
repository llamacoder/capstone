
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'test@test.com', pswd: '$2a$10$Q.KnTrs8rX/hgiL1R2b5HuoTR3zahSIV0GBxEQuXEhiMpigyKoBqm', num_priorities: 3,
                first_name: "Rich"},
        {id: 2, email: 'test1@test.com', pswd: '$2a$10$v61gohESSxwWvLijLRVinOJK/5QKiDB8gEionuWMTRsvmGe0FkA0W', num_priorities: 3,
                first_name: "Fred"},
        {id: 3, email: 'test2@test.com', pswd: '$2a$10$DUMQmtEgNtOCDjAFtKtBBOSWyGM.UMDCEtbefa/ASyYOdAggRzFk6', num_priorities: 3,
                first_name: "Lisa"}
      ]);
    });
};
