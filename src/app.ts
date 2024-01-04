import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './database/db';
import server from './server';
import Auth from './utils/Auth';
import { userRoutes, eventRoutes } from './routes/index';
// import swaggerUi from 'swagger-ui-express';
// import swagger from '../swagger.json';

dotenv.config();

const app = server;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', userRoutes);
app.use('/', eventRoutes);
//app.use('/', EventRoutes);

app.get('/auth', (_, response) => {
  response.send(
    Auth.verifyToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFidWJsZSIsImlhdCI6MTcwMzkxNTgyOSwiZXhwIjoxNzAzOTI2NjI5fQ.0czkc3QXKpFQTw9YykaT2fsTyoSJfILQMvs753w0YVY',
    ),
  );
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
  });
  connectToMongoDB();
}

export default app;
