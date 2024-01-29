const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Using promises version of fs for async/await
const path = require('path');
const app = express();
const PORT = 3000;


app.set('view engine','ejs');

const dataFilePath = path.join(__dirname, 'userData.txt');

// Middleware to parse JSON data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))

// Serve HTML page with registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle POST request for user registration
app.post('/register', async (req, res) => {
  const userData = req.body;

  try {
    // Read existing data from the file
   // const existingData = await fs.readFile(dataFilePath, 'utf8');

    // Parse existing data (assuming it's JSON)
   // const existingArray = JSON.parse(existingData);

    // Add new user data
   // existingArray.push(userData);

    // Write the updated data back to the file
   // await fs.writeFile(dataFilePath, JSON.stringify(existingArray));

   await fs.appendFile(dataFilePath,JSON.stringify(userData))

    res.json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
