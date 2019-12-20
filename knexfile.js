//TODO Add correct configuration settings
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/database.db3",
    },
    useNullAsDefault: true,
    pool: {
      //* SQLite3 specific - enforces FK
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    ...this.development,
    connection: {
      filename: "./data/test.db3",
    },
  },

  production: {
    ...this.development,
  },
};
