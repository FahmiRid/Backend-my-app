const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

const fs = require("fs");
const path = require("path");

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Define a POST endpoint for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are correct
  if (username === 'fahmi' && password === '123') {
    // Authentication success
    const user = {
      username: 'fahmi',
      role: 'admin'
    };

    res.json({ success: true, message: 'Login successful', user });
  } else if (username === 'ridwan' && password === '321') {
    // Authentication success for staff
    const user = {
      username: 'ridwan',
      role: 'staff'
    };

    res.json({ success: true, message: 'Login successful', user });
  } else {
    // Authentication failed
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

//Register API 
app.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  // Generate mockup user data
  const user = {
    username,
    password,
    role,
  };

  // Save the user data to a JSON file
  const filePath = path.join(__dirname, "users.json");
  const users = loadUsers(filePath);
  users.push(user);
  saveUsers(filePath, users);

  // Return a response indicating successful registration
  res.json({ message: "Registration successful" });
});

// Helper function to load existing users from JSON file
function loadUsers(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Failed to load users:", error);
    return [];
  }
}

// Helper function to save users to JSON file
function saveUsers(filePath, users) {
  try {
    let existingUsers = [];

    // Check if the file exists and contains valid JSON data
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      existingUsers = JSON.parse(fileData);
    }

    const updatedUsers = [...existingUsers, ...users];

    fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2), "utf8");
    console.log("Users saved successfully.");
  } catch (error) {
    console.error("Failed to save users:", error);
  }
}




// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
