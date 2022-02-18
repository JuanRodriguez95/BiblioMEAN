import express from "express";
import authorController from "../controllers/authorController.js";
import authorValidate from "../middleware/authorValidate.js";

const router = express.Router();

router.post('/registerAuthor',authorValidate.existingAuthor,authorController.registerAuthor);
router.get('/listAuthor/:name?',authorController.listAuthor);

export default router;