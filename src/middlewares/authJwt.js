import jwt from "jsonwebtoken"
import config from "../config"
import User from "../models/User"
import Role from "../models/Role"

export const verifyToken = async (req, res, next) =>{
    try {
    const token = req.headers["authorizationtoken"]

    if(!token) return res.status(403).json({message: "No token provided"});

    const decoded = jwt.verify(token, config.SECRET);

    req.userId = decoded.id;
    const user = await User.findById(decoded.id, {password: 0})
    if(!user) return res.status(404).json({message: "No user found"})



    console.log(user)
    next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized"});
    }
    
}

export const isModerator = async (req,res,next) => {
    const user = await User.findById(req.userId)
    console.log(user)
    const roles = await Role.find({_id: {$in: user.roles}})
    console.log(roles)
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name == "moderator"){
            next()
            return;
        }
    }
    return res.status(401).json({message: "Require Moderator Role"});
}

export const isAdmin = async (req,res,next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles}})
    console.log(roles)
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name == "admin"){
            next()
        }
    }
    return res.status(401).json({message: "Require Admin Role"});
}