const { faker } = require("@faker-js/faker");

const jwtUtilities = require("../utils/jwtUtilities");
const database = require("../db.js");

const login = (req, res, router) => {
  const { username, password } = req.body;
  const db = router.db;
  let user = db.get("users").find({ username: username }).value();
  if (!user) {
    res.status(401).json({
      status: 401,
      message: "Your password or username does not match.",
    });
  } else if (parseInt(user.password) !== parseInt(password)) {
    res.status(401).json({
      status: 401,
      message: "Your password or username does not match.",
    });
  } else {
    let token = jwtUtilities.createToken({ username, password });
    res.json({ ...user, token });
  }
};

const refreshToken = (req, res, router) => {
  const { userId } = req.body;
  const db = router.db;
  let user = db
    .get("users")
    .find({ id: parseInt(userId) })
    .value();
  if (!user) {
    res.status(401).json({
      status: 401,
      message: "User doesn't exist",
    });
  } else {
    let token = jwtUtilities.createToken({
      username: user.username,
      password: user.password,
    });
    res.json({ ...user, token });
  }
};

const signup = (req, res, router) => {
  const { username } = req.body;
  const db = router.db;
  let user = db.get("users").find({ username: username }).value();

  if (!user) {
    database.addUser({
      ...req.body,
      avatar: faker.image.avatarGitHub(),
      language: "en",
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Username already exist",
    });
  }
};

module.exports = {
  login,
  refreshToken,
  signup,
};
