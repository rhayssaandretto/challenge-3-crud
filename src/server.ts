import express from 'express';

const server = express();

server.get('/', (_, response) => {
  response.send('Connected successfully!');
});

export default server;
