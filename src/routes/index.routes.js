import {Router} from 'express'

const router = Router()


router.get("/", (req,res) =>{
    const obj = {
        nombre: "Joan",
        Apellido: "Corona"
    }
    res.json(obj)
})


export default router;