import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d", 
  });

  // Determine if we are in production to use secure cookies
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true, // Protects from XSS
    secure: isProduction, // Only set cookies over HTTPS in production
    sameSite: "strict", // Prevent CSRF

  });

  return token;
};

export default createTokenAndSaveCookie;
