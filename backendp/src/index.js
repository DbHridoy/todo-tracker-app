import dotenv from 'dotenv/config';
import connectDB from './db/db.js';
import mongoose from 'mongoose';
import app from './app.js';

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Welcome to the Todo API');
    });
  })
  .catch((err) => {});
