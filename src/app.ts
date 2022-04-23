import express from 'express';
const app = express();

app.get('/', (_req, res, _next) => {
  return res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Application listening at port 3000');
});