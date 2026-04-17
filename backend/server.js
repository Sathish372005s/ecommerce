import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./src/utils/dbutils.js";
import authrouter from "./src/routes/authrouter.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authrouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectdb();
});