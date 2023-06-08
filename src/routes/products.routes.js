import {Router} from 'express'
import {createProduct, getProducts, getProductsById, updateProduct, deleteProduct} from '../controllers/products.controllers'
const router = Router()


router.get("/", getProducts)

router.get("/:productId", getProductsById)

router.post("/", createProduct)

router.delete("/:productId", deleteProduct)

router.put("/:productId", updateProduct)


export default router;