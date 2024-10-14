'use strict';

import cors from 'cors';
import express from 'express';
import userRouter from './routes/user.route.js';
import expenseRoute from './routes/expense.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Node js accounting!');
});

app.use('/users', userRouter);
app.use('/expenses', expenseRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}!`)
})