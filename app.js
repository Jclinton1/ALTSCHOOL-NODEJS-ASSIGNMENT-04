const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const authorRouter = require('./authorRouter');

dotenv.config();
const PORT = process.env.PORT || 8900;
const app = express();


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/authors', authorRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


