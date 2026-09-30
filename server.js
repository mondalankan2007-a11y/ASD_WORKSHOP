const express = require("express");
const fs = require("fs");

const app = express();


app.get("/produts", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading file" });
        }

        res.json(JSON.parse(data));
    });
});



app.get("/products/:id", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading file" });
        }

        const jsonData = JSON.parse(data);

        const userId = Number(req.params.id);

        const user = jsonData.users.find((u) => u.id === userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});