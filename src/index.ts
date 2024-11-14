'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import adminRouter from './routes/admin.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import treatmentRouter from './routes/treatment.route.js';
import customerRouter from './routes/customer.route.js';
import recordRouter from './routes/record.route.js';

const app = express();
const PORT = process.env.PORT || 3004;

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Beauty salon!');
});

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/treatments', treatmentRouter);
app.use('/customers', customerRouter);
app.use('/records', recordRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
