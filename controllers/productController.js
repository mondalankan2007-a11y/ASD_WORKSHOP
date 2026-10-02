const productService = require("../services/productService");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error reading file" });
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Error reading file" });
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Error creating product" });
    }
}

async function updateProduct(req, res) {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Error updating product" });
    }
}

async function patchProduct(req, res) {
    try {
        const patchedProduct = await productService.patchProduct(req.params.id, req.body);
        if (!patchedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(patchedProduct);
    } catch (err) {
        res.status(500).json({ error: "Error updating product" });
    }
}

async function deleteProduct(req, res) {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        res.status(500).json({ error: "Error deleting product" });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
};
