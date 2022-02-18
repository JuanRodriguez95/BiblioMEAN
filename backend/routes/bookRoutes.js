import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middleware/bookValidate.js";

const router = express.Router();

router.post('/registerBook', bookValidate.existingBook,bookController.registerBook);
router.get('/listBook/:name?',bookController.listBooks);

export default router;
