import Role from '../models/Role'

export const createRoles = async () =>{
    
    try{
        const rolesCount = await Role.estimatedDocumentCount()
        if(rolesCount>0) return;
    
        const values = await Promise.all([
            new Role({name: "user"}).save(),
            new Role({name: "admin"}).save(),
            new Role({name: "moderator"}).save()
        ]);
    
        console.log(values)
    }catch(error){
        console.log(error)
    }

}