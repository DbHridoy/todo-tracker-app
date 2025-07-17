import dotenv from 'dotenv/config';
import connectDB from './db/db.js';
import app from './app.js';

const cd = connectDB;
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
//   .then(() => {
//    );
//     app.get('/', (req, res) => {
//       res.send('Welcome to the Todo Tracker App Backend!');
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
