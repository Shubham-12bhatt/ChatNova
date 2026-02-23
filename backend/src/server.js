const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const connectDB = require("./lib/db");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json({limit: "5mb"})); 
app.use(express.urlencoded({limit: "5mb", extended: true}));
app.use("/api/auth", authRouter);

app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});