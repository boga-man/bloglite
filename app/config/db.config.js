module.exports = {
  HOST: "localhost",
  USER: "bloglite",
  PASSWORD: "manoj@2001",
  DB: "bloglite",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
