// import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// creating express app
const app = express();
const PORT = 3000;

// middleware to read form data
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to use css files
app.use(express.static("public"));

// get route shows the bmi form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// post route calculates BMI
app.post("/calculate-bmi", (req, res) => {
  // Get weight and height from form
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  // Check for invalid input
  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    res.send("Invalid input. Please enter valid numbers.");
    return;
  }

  // bmi formula
  const bmi = weight / (height * height);

  let category = "";
  let color = "";

  // bmi category
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

  // send result to browser
  res.send(`
    <h1>BMI Result</h1>
    <p>Your BMI is ${bmi.toFixed(2)}</p>
    <p style="color:${color}">Category: ${category}</p>
    <a href="/">Go Back</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
