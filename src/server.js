const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let users = [];
let id = 1;

// Create
app.post('/users', (req, res) => {
  const user = { id: id++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Read all
app.get('/users', (req, res) => {
  res.json(users);
});

// Read one
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).send('Usuário não encontrado');
});

// Update
app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Delete
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
