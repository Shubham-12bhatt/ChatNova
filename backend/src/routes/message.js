const express = require("express");
const { getAllContacts, getChatPartners, getMessages, sendMessage } = require("../controllers/messageC");
const messageRouter = express.Router();

messageRouter.use(arcjetMiddleware,protectRoute);

messageRouter.get("/contacts", getAllContacts);
messageRouter.get("/chats", getChatPartners);
messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", sendMessage);










module.exports = messageRouter;