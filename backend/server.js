import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./src/utils/dbutils.js";
import authrouter from "./src/routes/authrouter.js";
import productrouter from "./src/routes/productroute.js";
import cartrouter from "./src/routes/cardroute.js";
import orderrouter from "./src/routes/orderroute.js";
import paymentrouter from "./src/routes/paymentroute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use("/api/auth", authrouter);
app.use("/api/products", productrouter);
app.use("/api/cart", cartrouter);
app.use("/api/orders", orderrouter);
app.use("/api/payment", paymentrouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectdb();
});