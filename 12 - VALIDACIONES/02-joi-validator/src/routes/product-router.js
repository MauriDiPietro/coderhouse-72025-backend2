import { Router } from 'express';
import { productController } from '../controllers/product-controller.js';
import { createValidator } from '../middlewares/validators/product-validator.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', createValidator, productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;