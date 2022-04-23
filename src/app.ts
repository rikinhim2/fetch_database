import express from 'express';
import knex from './knex';
import getRentalCount from './query/getRentalCount';
import { Temporal } from '@js-temporal/polyfill';

const app = express();
app.use(express.json());

app.get('/', async (_req, res, _next) => {

  const from = Temporal.PlainDateTime.from({
    year: 2005,
    month: 5,
    day: 24,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const to = Temporal.PlainDateTime.from({
    year: 2005,
    month: 5,
    day: 24,
    hour: 22,
    minute: 54,
    second: 33,
  });

  const recordCount = await getRentalCount(knex('rental')
    .whereBetween('rentalDate', [from, to]));
  return res.json({ recordCount });
});

app.listen(3000, () => {
  console.log('Application listening at port 3000');
});