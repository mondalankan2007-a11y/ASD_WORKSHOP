const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../db.json");

function readFile() {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading db.json:", err);
        throw err;
    }
}

async function readFileWithDelay() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return readFile();
}

function writeFile(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
        console.error("Error writing to db.json:", err);
        throw err;
    }
}

module.exports = {
    readFile,
    readFileWithDelay,
    writeFile,
};
