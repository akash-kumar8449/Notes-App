import jwt from 'jsonwebtoken';
import UserModel from '../models/Auth.js';

const VerificationToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, please login' });
    }

    // Verify token (decode + validate)
    const decoded = jwt.verify(token, process.env.secretKey);
    console.log("Decoded:", decoded);

    // Find User
    const user = await UserModel.findById(decoded.userId);
    console.log("User:", user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }

    req.userId = user._id;  // store for next middleware
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

export default VerificationToken;
