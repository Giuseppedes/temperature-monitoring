const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();

const APP_DIR = '../angular-client/dist/angular-client';
const PORT = 3000;

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

//return sessions
app.get('/api/sessions', (req, res) => {
    pool
        .query("SELECT S.ID, S.TIME AS CREATION_DATE, MIN(H.TIME) AS FIRST_TEMPERATURE, MAX(H.TIME) AS LAST_TEMPERATURE " +
            "FROM SESSIONS S LEFT JOIN HISTORY H " +
            "ON S.ID = H.SESSION_ID " +
            "GROUP BY S.ID, S.TIME")
        .then(rows => {
            res.send(rows);
        })
        .catch(err => {
            res.send(err);
        });
});

//return the temperatures of a specific session
app.get('/api/sessions/:sessionId/temperatures', (req, res) => {
    pool
        .query("SELECT id, time, temperature FROM HISTORY WHERE SESSION_ID = " + req.params.sessionId)
        .then(rows => {
            res.send(rows);
        })
        .catch(err => {
            res.send(err);
        });
});

// insert a new session
app.post('/api/sessions', (req, res) => {
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

// Serve Angular Application
// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(APP_DIR, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: APP_DIR});
});


app.listen(PORT);
