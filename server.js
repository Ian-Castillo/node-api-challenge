  // import express
const express = require('express');

// create server
const server = express();

// routers
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

server.use(express.json())

// bind routers
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.use('/', (req, res) => {
    res.send(`<h1>Node API Challenge</h1>`);
})

module.exports = server;