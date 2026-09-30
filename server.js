const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

const filePath = path.join(__dirname, "db.json");

const cache = {};

function readFile() {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function readFileWithDelay() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    const products = readFile();
    return products;
}

app.get("/products", async (req, res) => {
    try {
        const key = req.url;

        if (cache[key]) {
            return res.json(cache[key]);
        }

        const data = await readFileWithDelay();

        cache[key] = data;

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error reading file" });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const data = readFile();

        const productId = Number(req.params.id);

        const product = data.find((p) => p.id === productId);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: "Error reading file"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});