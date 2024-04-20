const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

const pool = new Pool({
    user: 'postgres',
    host: 'postgres-container',
    database: 'postgres',
    password: 'admin',
    port: 5432,
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO messages (name, email) VALUES ($1, $2)', [name, email], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Data saved successfully');
            res.send('Data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
