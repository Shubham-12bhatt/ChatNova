const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const connectDB = require("./lib/db");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/auth", authRouter);

app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});