const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

const PORT = 8080;
const JSON_SECRET_KEY = 'marvel';

const users = [
    { id: 1, username: 'bruceBanner', password: 'hulk' },
    { id: 2, username: 'tonyStark', password: 'ironman' },
    { id: 3, username: 'peterParker', password: 'spiderman' },
];

app.use(bodyParser.json());

app.get('/time', (req, res) => {
    const time = (new Date()).toLocaleTimeString();
    res.status(200).send(`The Time is ${time}`);
});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send('Error. Please enter the correct username and password');
        return;
    }

    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password;
    });

    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, JSON_SECRET_KEY, { expiresIn: '3 hours' });

    res.status(200).send({ token: token });
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
