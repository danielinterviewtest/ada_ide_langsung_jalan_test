const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db');

const indexRoute = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() => console.log('Connected to DB!'));

app.use('/', indexRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
