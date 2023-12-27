import express from "express";
import { connectToMongoDB } from "./database/db";
import { server } from "./server";
import dotenv from 'dotenv';
//import swaggerUi from 'swagger-ui-express';
//import swagger from '../swagger.json';

dotenv.config();

const app = server;
const port = process.env.PORT || 3000;

app.use(express.json());

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server running at localhost:${port}`);
    });
    connectToMongoDB();
  }
  
  export default app;