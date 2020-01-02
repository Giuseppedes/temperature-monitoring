const express = require('express');
const mariadb = require('mariadb');

const app = express();

const pool = mariadb.createPool({
   host: '127.0.0.1',
   user:'temperature',
   password: 'temperature',
   database: 'TEMPERATURE',
   connectionLimit: 5
});

app.get('/api/temperatures', (req, res) => {
   pool
       .query("SELECT * FROM HISTORY")
       .then(rows => {
          res.send(rows);
       })
       .catch(err => {
          res.send(err);
       });
});

app.listen(3000);
