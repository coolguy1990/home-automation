// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOSTNAME || '192.168.33.10',
      database: process.env.DB_DATABASE || 'homeautomation',
      user:     process.env.DB_USER || 'homestead',
      password: process.env.DB_PASSWORD || 'secret'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
