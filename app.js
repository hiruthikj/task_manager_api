const express = require('express');
const app = express();
require('dotenv').config({
  path: '.env',
});

const taskRouter = require('./routes/tasks');
const connectDB = require('./db/connect');

app.use(express.json());

app.use('/api/v1/tasks', taskRouter);

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  await connectDB(process.env.DB_URL);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
bootstrap();
