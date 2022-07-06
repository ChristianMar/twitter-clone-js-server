const CONFIG = {
  // db config
  maxUser: 100,
  maxPost: 500,

  // server config
  port: 3000,
  delay: 1000,

  // jwt config
  secretKey: "123456789",
  expiresIn: 600000,
};

module.exports = {
  CONFIG,
};
