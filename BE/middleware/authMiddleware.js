const jwt = require("jsonwebtoken");

function jwtverify(req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Ambil token setelah "Bearer "
    }

    const decoded = jwt.verify(token, "lucky");
    req.userId = decoded.userId;
    req.role = decoded.role; // Tambahkan role jika dibutuhkan
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = jwtverify;
