import Admin from "../models/adminModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export const registerAdmin = async (req , res ) => {
  try {
    const { username, password } = req.body;
    const adminIdentified = await Admin.findOne({ username });
    if (adminIdentified) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const admin = await Admin.create({ username, password });

    res.status(201).json({ message: "Admin registered successfully", 
      _id: admin._id, 
      username: admin.username, 
      token: generateToken(admin._id)
     });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: "Invalid username" });

  const match = await admin.matchPassword(password);
  if (!match) return res.status(400).json({ message: "Invalid password" });
  const accessToken = generateAccessToken(admin._id);
  const refreshToken = generateRefreshToken(admin._id);

  res
    .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "lax", maxAge: 15 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax", maxAge: 24 * 60 * 60 * 1000 })
    .json({ message: "Login successful", username: admin.username });
};



// export const loginAdmin = async (req , res ) => {
//   try {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(400).json({ message: "Invalid username" });
//     }
   
//     const isMatch = await admin.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     return res.status(200).json({ message: "Login successful", _id: admin._id, username: username, token: generateToken(admin._id) });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };



export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const refreshAccessToken = async (req, res) => {
  const refresh = req.cookies.refreshToken;
  if (!refresh) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refresh, process.env.JWT_SECRET);
    const newAccess = generateAccessToken(decoded.id);
    return res
  .cookie("accessToken", newAccess, { 
    httpOnly: true, 
    sameSite: "lax", 
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000 
  })
  .json({ 
    message: "New access token issued", 
    accessToken: newAccess 
  });
 } catch {
    return res.status(401).json({ message: "Token expired. Login again." });
  }
};
 

export const logoutAdmin = (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Logged out" });
};
