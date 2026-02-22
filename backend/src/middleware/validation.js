const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findById(decodedToken.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
        next();
    }
    catch (error) {
      console.log("Error in protectRoute middleware ",error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {protectRoute};
