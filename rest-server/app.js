const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();

app.use(cors());

const pool = mariadb.createPool({
   host: '127.0.0.1',
   user:'temperature',
   password: 'temperature',
   database: 'TEMPERATURE',
   connectionLimit: 5
});

app.get('/api/temperatures', (req, res) => {
   pool
       .query("SELECT id, time, temperature FROM HISTORY WHERE SESSION_ID = (SELECT MAX(ID) FROM SESSIONS)")
       .then(rows => {
          res.send(rows);
       })
       .catch(err => {
          res.send(err);
       });
});

app.listen(3000);
