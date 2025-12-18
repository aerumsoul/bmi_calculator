// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Create express app
const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to use CSS files
app.use(express.static("public"));

// GET route: shows the BMI form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// POST route: calculates BMI
app.post("/calculate-bmi", (req, res) => {
  // Get weight and height from form
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  // Check for invalid input
  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    res.send("Invalid input. Please enter valid numbers.");
    return;
  }

  // BMI formula
  const bmi = weight / (height * height);

  let category = "";
  let color = "";

  // Decide BMI category
  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi < 24.9) {
    category = "Normal";
    color = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "orange";
  } else {
    category = "Obese";
    color = "red";
  }

  // Send result to browser
  res.send(`
    <h1>BMI Result</h1>
    <p>Your BMI is ${bmi.toFixed(2)}</p>
    <p style="color:${color}">Category: ${category}</p>
    <a href="/">Go Back</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

