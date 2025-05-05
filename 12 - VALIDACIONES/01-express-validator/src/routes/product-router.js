import { Router } from 'express';
import { productController } from '../controllers/product-controller.js';
import { createValidator, paramValidator } from '../middlewares/validators/product-validator.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', paramValidator, productController.getById);
router.post('/', createValidator, productController.create);
router.put('/:id', paramValidator, productController.update);
router.delete('/:id', paramValidator, productController.delete);

export default router;