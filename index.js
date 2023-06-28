const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Define a POST endpoint for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are correct
  if (username === 'admin' && password === '123') {
    // Authentication success
    const user = {
      username: 'admin',
      role: 'admin'
    };

    res.json({ success: true, message: 'Login successful', user });
  } else if (username === 'staff' && password === '1212') {
    // Authentication success for staff
    const user = {
      username: 'staff',
      role: 'staff'
    };

    res.json({ success: true, message: 'Login successful', user });
  } else {
    // Authentication failed
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
