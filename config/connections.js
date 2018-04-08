module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },

  heroku_postgres: {
    adapter: 'sails-postgresql',
    url: process.env.DATABASE_URL,
    ssl: false
  }

};
