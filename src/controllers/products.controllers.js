import Category from "../models/Category"
import Product from "../models/Product"
export const createProduct = async (req,res) => {
    try{
        const {name, price, imgURL, stock, categorys} = req.body
        const NewProduct = new Product({
            name,
            price,
            imgURL,
            stock
        })
        console.log()
        if(categorys){
            const foundcategorys = await Category.find({name: {$in: categorys}})
            if (foundcategorys.length !== categorys.length) {
                const foundcategoryNames = foundcategorys.map((category) => category.name);
                const nonexistentcategorys = categorys.filter(
                (category) => !foundcategoryNames.includes(category)
                );
        
                return res.status(404).json({ message: `Las Categorias siguientes no existen: ${nonexistentcategorys.join(', ')}` });
            } 
            NewProduct.categorys = foundcategorys.map(category => category._id)
            
        }else{
            const category = await Category.findOne({name: "General"})
            NewProduct.categorys = [category._id];
        }
        const productSave = await NewProduct.save();
        res.status(201).json(productSave)
    }catch(error){
        console.log(error)
        res.status(409).json({message: "This Product name already exists.."})
    }
}

export const getProducts = async (req,res) =>{
    const products = await Product.find().populate("categorys");


    res.json(products)
}

export const getProductsById = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.productId);
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message: "Product ID was deleted..."})
        }
        
    }catch(error){
        res.status(404).json({message: "Product ID not found..."})
    }
}

export const updateProduct = async (req,res) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId,  req.body,{
            new: true
        });
        res.json(updatedProduct)
    }catch(error){
        res.status(404).json({message: "Product ID not found..."})
    }
}

export const deleteProduct = async (req,res) =>{
    try{
        await Product.findByIdAndDelete(req.params.productId);
        res.status(204).json()
    }catch(error){
        res.status(404).json({message: "Product ID not found..."})
    }
}