const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Replace with your MySQL database configuration
const connection = mysql.createConnection({
  host: 'b33uqxdtus2o3xmkisan-mysql.services.clever-cloud.com',
  user: 'ubh7sgwpx1gromc1',
  password: 'uOYrSQMDOERw9BY8hUqO',
  database: 'b33uqxdtus2o3xmkisan',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Add a route to handle the data sent from the React Native app
app.post('/api/furniture', (req, res) => {
  const {
    furnitureType,
    selectedDepartment,
    selectedCondition,
    location,
    generatedID,
  } = req.body;

  const sql = `INSERT INTO furniture (furnitureType, selectedDepartment, selectedCondition, location, generatedID)
               VALUES (?, ?, ?, ?, ?)`;

  connection.query(sql, [furnitureType, selectedDepartment, selectedCondition, location, generatedID], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data into the database' });
      return;
    }
    console.log('Data inserted successfully!');
    res.json({ message: 'Data inserted successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
