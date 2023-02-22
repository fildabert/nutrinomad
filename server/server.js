require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/users');

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api/users', userRoutes);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to database\nListening to port', process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

// const API_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

// axios
//   .get(
//     `${API_URL}?query=apple&pageSize=2&api_key=${API_KEY}&dataType=${[
//       'Survey (FNDDS)',
//     ]}`
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
