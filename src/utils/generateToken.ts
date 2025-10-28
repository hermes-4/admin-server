import jwt from "jsonwebtoken"


export const generateToken = (id: any)=>{
      const secret = process.env.JWT_SECRET
            if (!secret) {
                throw new Error("Server misconfiguration: JWT_SECRET not set")}
    return jwt.sign({ id }, secret, {
        expiresIn: "24h",
    });
}