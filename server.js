const express = require('express');

const server = express();

server.use(express.json());

const dogs = [{id: 1, name: 'Doggo'}, {id: 2, name: 'Golden Retriver'}];

let id = 3;

server.get('/api/dogs', (req, res) => {

  res.status(200).json(dogs);

});

server.post('/api/dogs', (req, res) => {

  const { name } = req.body;

  if (!name) {

    res.status(400).json({message: 'no name provided'});
    return;

  }

  const nameExists = dogs.filter(dog => dog.name === name);

  if (nameExists.length) {

    res.status(500).end();
    return;

  }

  dogs.push({id, name});

  res.status(201).json({id});

  id++;

});

server.delete('/api/dogs/:id', (req, res) => {

  const id = req.params.id;

  let index = dogs.find(dog => dog.id == id);

  console.log(index);

  if (index === undefined) {

    res.status(404).json({message: 'not found'});
    return;

  }

  dogs.splice(index, 0);

  res.status(200).json({ id });

});

module.exports = server;
