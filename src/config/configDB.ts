import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
const MONGO_URI: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@crud.gpo6l0e.mongodb.net/eventCrud`;

const PORT = process.env.PORT ? Number(process.env.PORT) : 1337;

export const config = {
  mongo: {
    uri: MONGO_URI,
  },
  server: {
    port: PORT,
  },
};
