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

//return the temperatures of the last session
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

app.post('/api/new-session', (req, res) => {
    pool
        .query("INSERT INTO SESSIONS VALUES ()")
        .then(rows => {
            // new record generated in sessions table
            pool
                .query("SELECT * FROM SESSIONS WHERE ID = (SELECT MAX(ID) FROM SESSIONS)")
                .then(rows => {
                    // return the new record
                    res.send(rows);
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
});

app.listen(3000);
