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

  // Load the users from the JSON file
  const filePath = path.join(__dirname, 'users.json');
  const users = loadUsers(filePath);

  // Find the user with the provided username and password
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Authentication success
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
async function saveUsers(filePath, users) {
  try {
    let existingUsers = [];

    if (await fs.promises.exists(filePath)) {
      const fileData = await fs.promises.readFile(filePath, "utf8");
      existingUsers = JSON.parse(fileData);
    }

    const updatedUsers = [...existingUsers, ...users];

    await fs.promises.writeFile(filePath, JSON.stringify(updatedUsers, null, 2), "utf8");
    console.log("Users saved successfully.");
  } catch (error) {
    console.error("Failed to save users:", error);
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


app.get('/api/users', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'users.json');
    const users = loadUsers(filePath);
    res.json(users);
  } catch (error) {
    console.error("Error retrieving user list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/check-username', (req, res) => {
  const { username } = req.query;

  const filePath = path.join(__dirname, 'users.json');
  const users = loadUsers(filePath);

  const isAvailable = !users.some(user => user.username === username);

  res.json({ isAvailable });
});

function fetchPermissions(product_line_id, role_id) {
  // Implement logic to fetch permissions based on product_line_id and role_id
  // Replace this with your actual data retrieval logic
  const permissions = [
    // Sample permission data
    {
      permission_id: 1,
      C: 0,
      R: 0,
      U: 0,
      D: 0,
      A: 0,
      permission: 'USER',
      permission_description: 'user',
      parent_permission_id: null,
      parent_permission: null,
      is_parent: 1,
      product_line_name: 'MORTGAGE',
      product_line_id: 1,
      platform_id: 1,
      platform_name: 'Admin',
    },
    {
      "permission_id": 2,
      "C": 0,
      "R": 0,
      "U": 0,
      "D": 0,
      "A": 0,
      "permission": "MANAGE_ROLE",
      "permission_description": "mange role",
      "parent_permission_id": 1,
      "parent_permission": "USER",
      "is_parent": 0,
      "product_line_name": "MORTGAGE",
      "product_line_id": 1,
      "platform_id": 1,
      "platform_name": "Admin"
  },
  {
      "permission_id": 3,
      "C": 0,
      "R": 0,
      "U": 0,
      "D": 0,
      "A": 0,
      "permission": "MANAGE_USER",
      "permission_description": "manage user",
      "parent_permission_id": 1,
      "parent_permission": "USER",
      "is_parent": 0,
      "product_line_name": "MORTGAGE",
      "product_line_id": 1,
      "platform_id": 1,
      "platform_name": "Admin"
  },
  {
      "permission_id": 4,
      "C": 0,
      "R": 0,
      "U": 0,
      "D": 0,
      "A": 0,
      "permission": "REPORT",
      "permission_description": "report",
      "parent_permission_id": null,
      "parent_permission": null,
      "is_parent": 1,
      "product_line_name": "MORTGAGE",
      "product_line_id": 1,
      "platform_id": 1,
      "platform_name": "Admin"
  },
  {
      "permission_id": 5,
      "C": 0,
      "R": 0,
      "U": 0,
      "D": 0,
      "A": 0,
      "permission": "EXPORT_REPORT",
      "permission_description": "export report",
      "parent_permission_id": 4,
      "parent_permission": "REPORT",
      "is_parent": 0,
      "product_line_name": "MORTGAGE",
      "product_line_id": 1,
      "platform_id": 1,
      "platform_name": "Admin"
  },
  {
      "permission_id": 6,
      "C": 0,
      "R": 0,
      "U": 0,
      "D": 0,
      "A": 0,
      "permission": "HOME",
      "permission_description": "home",
      "parent_permission_id": null,
      "parent_permission": null,
      "is_parent": 1,
      "product_line_name": null,
      "product_line_id": null,
      "platform_id": 2,
      "platform_name": "Salesforce"
  },
  {
      "permission_id": 9,
      "C": 0,
      "R": 0,
      "U": 0,
      "D": 0,
      "A": 0,
      "permission": "TESTING",
      "permission_description": "DESCRIPTION",
      "parent_permission_id": 6,
      "parent_permission": "HOME",
      "is_parent": 0,
      "product_line_name": "MORTGAGE",
      "product_line_id": 1,
      "platform_id": 1,
      "platform_name": "Admin"
  }
  ];

  return permissions;
}

app.post('/salesforce/user/role/permission/list', (req, res) => {
  // Extract the product_line_id and role_id from the request body (optional)
  const { product_line_id, role_id } = req.body;

  // Fetch permissions based on product_line_id and role_id
  const permissions = fetchPermissions(product_line_id, role_id);

  // Construct the response object
  const response = {
    statusCode: 'MH000',
    code: 200,
    text: 'success',
    data: {
      role_id: 58, // Replace with the actual role_id
      list: permissions,
    },
  };

  res.json(response);
});

let data = [];

// Sample JSON file path
const jsonFilePath = 'data.json';

// Create an endpoint to receive and store data
app.post('/api/storeData', (req, res) => {
  try {
    const newData = req.body;

    // Add the received data to the in-memory storage
    data.push(newData);

    // Save the data to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Data stored successfully', newData });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create an endpoint to receive and store data
app.post('/role/submit', (req, res) => {
  const roleName = req.body.roleName;
  const productLine = req.body.productLine;

  // Create an object to store in the data array
  const newData = {
    roleName,
    productLine,
  };

  // Add the received data to the in-memory storage
  data.push(newData);

  // Save the data to the JSON file
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

  res.json({ message: 'Parameters received and stored successfully!', newData });
});

app.get('/api/rolePermissions', (req, res) => {
  try {
    const data = require('./data.json'); // Load data from data.json
    res.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
