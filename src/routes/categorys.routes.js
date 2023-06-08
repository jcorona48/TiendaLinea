import {Router} from 'express'
import {createCategory, getCategorys, getCategorysById, updateCategory, deleteCategory} from '../controllers/category.controllers'
const router = Router()


router.get("/", getCategorys)

router.get("/:CategoryId", getCategorysById)

router.post("/", createCategory)

router.delete("/:CategoryId", deleteCategory)

router.put("/:CategoryId", updateCategory)


export default router;