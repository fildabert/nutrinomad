require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/users');
const foodDiaryRoutes = require('./routes/foodDiary');
const foodRoutes = require('./routes/food');
const mealRoutes = require('./routes/meal');

//middleware
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 })
);
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/diary', foodDiaryRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/meal', mealRoutes);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to database\nListening to port', process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
