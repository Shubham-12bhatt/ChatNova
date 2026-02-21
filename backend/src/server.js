const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);

app.use("/api/messages", messageRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));