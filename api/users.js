const jwtUtilities = require("../utils/jwtUtilities");

const database = require("../db.js");

const getUsers = (req, res, router) => {
  let verifyTokenResult = jwtUtilities.verifyToken(
    req.headers.authorization,
    res,
    router
  );

  if (verifyTokenResult === true) {
    const db = router.db;
    let users = db.get("users").value();
    res.json({
      users: users,
    });
  }
};

const createUser = (req, res, router) => {
  const { username, firstName, lastName, email, password, avatar } = req.body;

  database.addUser({
    username,
    firstName,
    lastName,
    email,
    password,
    avatar,
  });
  res.json({
    success: true,
  });
};

module.exports = {
  getUsers,
  createUser,
};
