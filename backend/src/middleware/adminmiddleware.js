
export const isAdmin = (req, res, next) => {
    console.log("admin middleware is hit")
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "Access denied. Admin only." });
        } 
    } catch (error) {
        return res.status(500).json({ message: "error occurred from middleware admin" });
    }
};
