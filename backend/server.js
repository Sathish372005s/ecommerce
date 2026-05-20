import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./src/utils/dbutils.js";
import authrouter from "./src/routes/authrouter.js";
import productrouter from "./src/routes/productroute.js";
import cartrouter from "./src/routes/cardroute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/auth", authrouter);
app.use("/api/products", productrouter);
app.use("/api/cart", cartrouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectdb();
});