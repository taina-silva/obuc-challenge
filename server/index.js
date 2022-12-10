const express = require("express");
const app = express();
const PORT = 3001;

const users_manager = require('./users_manager')

app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
    users_manager.get_all_users()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/users', (req, res) => {
    users_manager.add_user(req.body)
    .then(response => {
        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
            body: "Successfully added user",
        };
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`)
})