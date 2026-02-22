const express = require("express");
const { register,login,logout,updateProfile } = require("../controllers/authC");
const authRouter = express.Router();
const { protectRoute } = require("../middleware/validation");

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", protectRoute, updateProfile);
authRouter.get("/check",protectRoute,(req,res)=>{
  return res.status(200).json(req.user);
})







module.exports = authRouter;