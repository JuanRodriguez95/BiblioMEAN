import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

router.post("/registerRole",roleController.registerRol);
router.get("/listRoles",roleController.listRoles);



export default router;

