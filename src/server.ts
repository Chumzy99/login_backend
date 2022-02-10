import dotenv from 'dotenv';

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION! 💥 , shutting down ...');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});

dotenv.config();
import app from './app';

const port: string | number = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 , shutting down ...');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
