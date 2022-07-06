const jwt = require("jsonwebtoken");
var options = require("../config");
const config = options.CONFIG;

const userUtilities = require("./userUtilities");

const createToken = (payload) => {
  let expiresIn = config.expiresIn;
  return jwt.sign(payload, config.secretKey, { expiresIn });
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
    return jwt.verify(token.split(" ")[1], config.secretKey, (err, decode) => {
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
