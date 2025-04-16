import { Router } from "express";
const router = Router();
import ProductManager from '../manager/products.manager.js';
import { createProduct, deleteProducts, getAllProducts } from "../controllers/product.controllers.js";
const productManager = new ProductManager('./products.json');

//    /api/products
router.route('/')
    .get(getAllProducts)
    .post(createProduct)
    .delete(deleteProducts)

//    /api/products/:id
router.route('/:id')
    .get(getById)
    .put(update)
    .delete(remove)

export default router;

