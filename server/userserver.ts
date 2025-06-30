import express from 'express';
import * as dotenv from 'dotenv';
import userroutes from '../routes/userroutes';

//dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', userroutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
