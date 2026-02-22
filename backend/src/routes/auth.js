const express = require("express");
const { register } = require("../controllers/authC");
const authRouter = express.Router();


authRouter.post("/register",register);

authRouter.post("/login", (req, res) => {
    res.send("Login");
});

authRouter.post("/logout", (req, res) => {
    res.send("Logout");
});








module.exports = authRouter;