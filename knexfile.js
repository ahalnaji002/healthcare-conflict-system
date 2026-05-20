module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "healthcare_conflict_system",
    },
    migrations: {
      directory: "./database/migrations",
    },
  },
};
