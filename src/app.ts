import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoDBConnect from './database/connect';
import authRoute from './routes/authRoute';

const app: Application = express();

app.use(cors());

// express body parser
app.use(express.json());

// connect Database.
mongoDBConnect();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoute);

export default app;
``;
