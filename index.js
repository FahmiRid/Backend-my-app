const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

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

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
