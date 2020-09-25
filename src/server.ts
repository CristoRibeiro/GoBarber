import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/barber', (request, response) => {
  const { name } = request.query;

  return response.json({ message: `Hello Barber ${name}!!!!` });
});

app.listen(3333, () => {
  console.log('Server started with success !');
});
