const express = require('express')
const lodash = require('lodash')
const shortid = require('shortid');
const app = express()
const bodyParser = require('body-parser')
const { users, createUser, updateUser, deleteUser, userById } = require('./models/user.js')
const port = 3000

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/users/:id', (req, res) => {
  const getUser = userById(req.params)
  if (getUser === 404) {
    res.status(getUser).send('the id is not available!')
  } else {
    res.send(getUser)
  }
})


app.post('/users', (req, res) => {
  const result = createUser(req.body)
  if (result === 403) {
    res.status(403).send("This email is already used!")
  }
  else {
    res.send(result)
  }
})

app.put('/users/:id', (req, res) => {
  const result = updateUser(req.params.id, req.body)
  if (result === 403) {
    res.status(403).send('this email already exists!')
  } else {
    res.send(users)
  }
})

app.delete('/users/:id', (req, res) => {
  const delUser = deleteUser(req.params.id);
  if (delUser === 404) {
    res.status(delUser).send("The id is not available!");
  } else {
    res.send(delUser);
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
