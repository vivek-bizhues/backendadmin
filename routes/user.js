const express = require('express');
const router = express.Router();
const User = require("../models/User.model");
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with a secure secret key


// Routes

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        username,
        password,
        role : "user"
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration failed:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Routes
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Assuming admin credentials are hard-coded for simplicity
    const adminUsername = 'admin';
    const adminPassword = 'adminPassword'; // Replace with a secure password
  
    try {
      let user;
  
      if (username === adminUsername && password === adminPassword) {
        user = { username: adminUsername, role: 'admin' };
      } else {
        // Check regular user credentials in the database
        user = await User.findOne({ username, password });
  
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      }
  
      // Create a JWT token
      const token = jwt.sign({ username: user.username, role: user.role }, secretKey, {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });
  
      res.json({ token, user });
    } catch (error) {
      console.error('Login failed:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;