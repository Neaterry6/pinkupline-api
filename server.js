const { pickupLines, rizzLines } = require("./pickupLines");

app.get("/random", (req, res) => {
    const allLines = [...pickupLines, ...rizzLines];
    const randomIndex = Math.floor(Math.random() * allLines.length);
    res.json({ line: allLines[randomIndex] });
})
