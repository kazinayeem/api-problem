const jwt = require("jsonwebtoken");
const checklogin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT);
      req.user = decode;
    } else {
     return res.json({
        error: "token not found",
      });
    }
    next();
  } catch (error) {
    res.json({
      error: "auth error",
    });
  }
};

module.exports = checklogin;
