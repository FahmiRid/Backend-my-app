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

function loadPermissions(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Failed to load permissions:", error);
    return {};
  }
}


app.get('/api/permissions/list', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'permissionList.json');
    const permissionList = loadPermissions(filePath);
    res.json(permissionList);
  } catch (error) {
    console.error("Error retrieving permission list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


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
    // Add more permission objects as needed
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



const subCategories = {
  1: 'Success Application',
  2: 'Failed Application',
  3: 'Appeal Application',
  4: 'Document Upload',
  5: 'Document Extraction',
};

// Endpoint to get sub-category data
app.get('/api/subcategories', (req, res) => {
  res.json(subCategories);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
