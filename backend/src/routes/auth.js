const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
    res.send("Register");
});

authRouter.post("/login", (req, res) => {
    res.send("Login");
});

authRouter.post("/logout", (req, res) => {
    res.send("Logout");
});








module.exports = authRouter;