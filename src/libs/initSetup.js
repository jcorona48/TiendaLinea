import Role from '../models/Role'
import Category from '../models/Category'

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

export const createCategorys = async () =>{
    
    try{
        const categorysCount = await Category.estimatedDocumentCount()
        if(categorysCount>0) return;
    
        const values = await Promise.all([
            new Category({name: "General"}).save()
        ]);
    
        console.log(values)
    }catch(error){
        console.log(error)
    }
}

