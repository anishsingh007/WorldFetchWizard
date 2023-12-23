const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(req.header, token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    jwt.verify(token, "acharyaPrashant", (err, decoded) => {
      if (err) {
        console.log("Error:", err);
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log("Exception:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  authenticate,
};
