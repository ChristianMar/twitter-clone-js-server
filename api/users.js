const jwtUtilities = require("../utils/jwtUtilities");
const _ = require("lodash");

const database = require("../db.js");

const getUsers = (req, res, router) => {
  const { limit, page } = req.body;

  const db = router.db;
  let users = db.get("users").value();
  let tmpPage, tmpLimit;
  if (page === null || page === undefined) tmpPage = 0;
  else tmpPage = page - 1;
  if (limit === null || limit === undefined) tmpLimit = 50;
  else tmpLimit = limit;

  users = _.orderBy(users, [(item) => item.username], ["asc"]);
  arr = _.chunk(users, tmpLimit);

  res.json({
    users: !arr[tmpPage] ? [] : arr[tmpPage],
    cursor: {
      next: !arr[tmpPage + 1] ? false : true,
      prev: !arr[tmpPage - 1] ? false : true,
    },
  });
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
