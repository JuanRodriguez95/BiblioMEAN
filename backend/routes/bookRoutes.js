import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middleware/bookValidate.js";

const router = express.Router();

router.post('/registerBook', bookValidate.existingBook,bookController.registerBook);
router.get('/listBook/:name?',bookController.listBooks);
router.put('/deleteBook/:_id',bookController.deleteBooks);
router.put('/updateBook',bookController.updateBook);

export default router;
