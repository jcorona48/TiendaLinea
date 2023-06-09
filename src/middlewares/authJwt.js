import jwt from "jsonwebtoken"
import config from "../config"

export const verifyToken = async (req, res, next) =>{

    const token = req.headers["authorizationtoken"]

    if(!token) return res.status(403).json({message: "No token provided"});

    const decoded = jwt.verify(token, config.SECRET);

    

    console.log(token)
    next();
}