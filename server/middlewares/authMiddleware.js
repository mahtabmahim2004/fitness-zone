const jwt = require("jsonwebtoken");

// ==========================
// Verify JWT Token
// ==========================
const verifyToken = (req, res, next) => {
    try {
        // Authorization Header থেকে Token নেওয়া
        const authHeader = req.headers.authorization;

        // Token না থাকলে
        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Bearer Token থেকে Token আলাদা করা
        const token = authHeader.split(" ")[1];

        // Token Verify করা
        const decoded = jwt.verify(token, "mysecretkey");

        // Request-এ Admin তথ্য সংরক্ষণ
        req.admin = decoded;

        // পরের Middleware/Controller-এ যাওয়া
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;