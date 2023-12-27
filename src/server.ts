import express from "express";

const server = express();

server.get('/', (_, response) => {
    return response.send('Connected sucessfully!');
});

export { server };