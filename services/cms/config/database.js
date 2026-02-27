module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL', 'postgres://postgres:example@db:5432/catalog'),
    useNullAsDefault: true,
  },
});
