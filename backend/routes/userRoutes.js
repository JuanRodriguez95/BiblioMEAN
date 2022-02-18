import express from "express";
import userController from "../controllers/userController.js";
import userValidate from "../middleware/userValidate.js";
import rolValidate from "../middleware/rolValidate.js";


const router = express.Router();

// router.post("/registerUser/:email/:idAnimal",(req,res)=>{
//     res.status(200).send({ message: req.params.email +  req.params.idAnimal });
// });

router.post("/registerUser",userValidate.userValidator,rolValidate.existingRole, userController.registerUser); 


router.get("/listUsers/:name?",userController.listUser)
export default router; 