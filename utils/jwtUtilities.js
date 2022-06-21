const jwt = require("jsonwebtoken");

const userUtilities = require("./userUtilities");

const SECRET_KEY = "123456789";
const expiresIn = "300000";

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const setError = (res, message) => {
  const status = 401;
  res.status(status).json({ status, message });
};

const verifyToken = (token, res, router) => {
  if (token === undefined || token.split(" ")[0] !== "Bearer") {
    setError(res, "TOKEN_ERROR");
    return false;
  } else {
    return jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decode) => {
      if (!decode) {
        if (err.name === "TokenExpiredError") {
          setError(res, "TOKEN_EXPIRED");
          return false;
        } else {
          setError(res, "TOKEN_ERROR");
          return false;
        }
      }
      let user = userUtilities.getUserByUsername(decode.username, router);
      if (!user) {
        setError(res, "TOKEN_ERROR");
        return false;
      }
      if (
        user.username === decode.username &&
        parseInt(user.password) === parseInt(decode.password)
      )
        return true;
      setError(res, "TOKEN_ERROR");
      return false;
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
