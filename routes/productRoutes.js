const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { cacheMiddleware, invalidateCacheMiddleware } = require("../middleware/cacheMiddleware");

// GET /products
router.get("/", cacheMiddleware, productController.getProducts);

// GET /products/:id
router.get("/:id", cacheMiddleware, productController.getProductById);

// POST /products
router.post("/", invalidateCacheMiddleware, productController.createProduct);

// PUT /products/:id
router.put("/:id", invalidateCacheMiddleware, productController.updateProduct);

// PATCH /products/:id
router.patch("/:id", invalidateCacheMiddleware, productController.patchProduct);

// DELETE /products/:id
router.delete("/:id", invalidateCacheMiddleware, productController.deleteProduct);

module.exports = router;
