import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signup = async (req, res) => {
    const {name, username, password, email, roles} = req.body;
    try{
        const newUser = new User({
            name,
            username,
            email,
            password: await User.encryptPassword(password)
            
        });
    
        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            if (foundRoles.length !== roles.length) {
                const foundRoleNames = foundRoles.map((role) => role.name);
                const nonexistentRoles = roles.filter(
                  (role) => !foundRoleNames.includes(role)
                );
        
                return res.status(404).json({ message: `Los roles siguientes no existen: ${nonexistentRoles.join(', ')}` });
            }
            newUser.roles = foundRoles.map(role => role._id)
            
        }else{
            const role = await Role.findOne({name: "user"})
            newUser.roles = [role._id];
        }
    
        const savedUser = await newUser.save();
        console.log(savedUser)
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400 //24 hours
        })
    
        res.status(200).json({token})
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Roles problems... "})
    }
    
}


export const signin = async (req, res) =>{

    const userFound = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] }).populate('roles')

    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: "Invalid password"})

    console.log(userFound)

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json(token)
}