import 'dotenv/config';
import connectDB from './config/db.config.js';
import { app } from './app.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed !!! ', err);
    process.exit(1);
  });
