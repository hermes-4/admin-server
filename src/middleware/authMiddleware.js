import Admin from "../models/adminModel.js"
import jwt from "jsonwebtoken" 
export const verifyToken = async (req , res , next ) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]

            const secret = process.env.JWT_SECRET
            if (!secret) {
                return res.status(500).json({ message: "Server misconfiguration: JWT_SECRET not set" })
            }

            const decoded = jwt.verify(token, secret) 
            req.admin = await Admin.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            res.status(401).json({ message: "Unauthorized: wrong token", error: error.message })
        }
    }
    if (!token){
        res.status(401).json({ message: "Unauthorized: no token", error: error.message })
    }
}