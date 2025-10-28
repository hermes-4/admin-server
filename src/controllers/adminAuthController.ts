import Admin from "../models/adminModel";
import { generateToken } from "../utils/generateToken";

export const registerAdmin = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const adminIdentified = await Admin.findOne({ username });
    if (adminIdentified) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const admin = await Admin.create({ username, password });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const loginAdmin = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid username" });
    }
    // else if (admin && !(await (admin as any).matchPassword(password))) {
    //   return res.status(400).json({ message: "Invalid password" });
    // }else if (admin && (await (admin as any).matchPassword(password))) {
    //     return res.status(200).json({ message: "Login successful", _id: admin._id, username: username, token: generateToken(admin._id) });
    // } else {
    //     return res.status(401).json({message: "Invalid credentials"});
    // }} catch (error) {
    //     res.status(500).json({ message: "Server Error", error });
    // }
    const isMatch = await (admin as any).matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful", _id: admin._id, username: username, token: generateToken(admin._id) });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
