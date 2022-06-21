const _ = require("lodash");

const getUserById = (userId, router) => {
  const db = router.db;
  let user = db.get("users").value();
  user = _.filter(user, (item) => parseInt(item.id) === parseInt(userId))[0];
  return user;
};

const getUserByUsername = (username, router) => {
  const db = router.db;
  let user = db.get("users").value();
  user = _.filter(user, (item) => item.username === username)[0];
  return user;
};

module.exports = {
  getUserById,
  getUserByUsername,
};
