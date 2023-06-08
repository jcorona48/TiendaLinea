import Category from "../models/Category"

export const createCategory = async (req,res) =>{
    try{
        const {name, description} = req.body
        const NewCategory = new Category({name: name, description: description})
    
        const CategorySave = await NewCategory.save();
        res.status(201).json(CategorySave)
    }catch(error){
        res.status(409).json({message: "This Category name already exists.."})
    }

}

export const getCategorys = async (req,res) =>{
    const categorys = await Category.find();

    res.json(categorys)
}

export const getCategorysById = async(req,res) =>{
    try{
        const category = await Category.findById(req.params.CategoryId);
        if(category){
            res.json(category)
        }else{
            res.status(404).json({message: "Category ID was deleted..."})
        }
        
    }catch(error){
        res.status(404).json({message: "Category ID not found..."})
    }
    
    

}

export const updateCategory = async(req,res) =>{
    try{
        const updatedCategory = await Category.findByIdAndUpdate(req.params.CategoryId,  req.body,{
            new: true
        });
        res.json(updatedCategory)
    }catch(error){
        res.status(404).json({message: "Category ID not found..."})
    }
}

export const deleteCategory = async(req,res) =>{
    try{
        await Category.findByIdAndDelete(req.params.CategoryId);
        res.status(204).json()
    }catch(error){
        res.status(404).json({message: "Category ID not found..."})
    }
}