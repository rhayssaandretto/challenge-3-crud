import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './database/db';
import server from './server';
import { userRoutes, eventRoutes } from './routes/index';

dotenv.config();

const app = server;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', userRoutes);
app.use('/', eventRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
  });
  connectToMongoDB();
}

export default app;
