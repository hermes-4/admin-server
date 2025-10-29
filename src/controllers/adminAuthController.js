import Admin from "../models/adminModel.js";
import { generateToken } from "../utils/generateToken.js";

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


export const loginAdmin = async (req , res ) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid username" });
    }
   
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful", _id: admin._id, username: username, token: generateToken(admin._id) });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



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
