import {Router} from 'express'
import {createCategory, getCategorys, getCategorysById, updateCategory, deleteCategory} from '../controllers/category.controllers'
import {authJwt} from '../middlewares'
const router = Router()


router.get("/", getCategorys)

router.get("/:CategoryId",[authJwt.verifyToken, authJwt.isModerator], getCategorysById)

router.post("/",[authJwt.verifyToken, authJwt.isModerator], createCategory)

router.delete("/:CategoryId",[authJwt.verifyToken, authJwt.isAdmin], deleteCategory)

router.put("/:CategoryId",[authJwt.verifyToken, authJwt.isModerator], updateCategory)


export default router;