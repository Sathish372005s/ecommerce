import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async(req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = await User.findById(decoded._id).select("-password");
        console.log("Authenticated user: error in decode");
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "error occurred from middleware auth" });
    }
}