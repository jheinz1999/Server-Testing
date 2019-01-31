const express = require('express');

const server = express();

server.use(express.json());

const dogs = [{id: 1, name: 'Doggo'}, {id: 2, name: 'Golden Retriver'}];

server.get('/api/dogs', (req, res) => {

  res.status(200).json(dogs);

});

module.exports = server;
