import dotenv from 'dotenv';

dotenv.config();
import app from './app';

const port: string | number = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
