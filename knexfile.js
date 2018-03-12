// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/db'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/db'
 },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_NAME
 },

};
