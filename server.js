const express = require("express");
const fs = require("fs");
const { pickupLines, rizzLines } = require("./pickupLines"); // Ensure filename matches exactly

const app = express();
app.use(express.json());

const allLines = [...pickupLines, ...rizzLines];

// Get a random pickup or rizz line
app.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * allLines.length);
    res.json({ line: allLines[randomIndex] });
});

// Get all pickup and rizz lines
app.get("/all", (req, res) => {
    res.json({ pickupLines, rizzLines });
});

// Add a new pickup or rizz line
app.post("/add", (req, res) => {
    const { type, line } = req.body;
    if (!line || (type !== "pickup" && type !== "rizz")) {
        return res.status(400).json({ error: "Invalid request. Provide type ('pickup' or 'rizz') and a line." });
    }

    if (type === "pickup") {
        pickupLines.push(line);
    } else {
        rizzLines.push(line);
    }

    // Update pickuplines.js file dynamically
    fs.writeFileSync("./pickuplines.js", `module.exports = { pickupLines: ${JSON.stringify(pickupLines, null, 2)}, rizzLines: ${JSON.stringify(rizzLines, null, 2)} };`);

    res.json({ message: "Pickup/rizz line added!", type, line });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
