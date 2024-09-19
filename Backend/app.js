import express from 'express';
import emailRoute from './routes/email.route';

const app = express();

app.use(express.json());
app.use('/api', emailRoute);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});