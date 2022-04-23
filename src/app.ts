import express, { Request, Response } from 'express';
import knex from './knex';
import getRentalCount from './query/getRentalCount';
import { Temporal } from '@js-temporal/polyfill';

const app = express();
app.use(express.json());

app.get('/requestCount', async (req: Request, res: Response, _next) => {

  const from = Temporal.PlainDateTime.from(req.query.from as string);
  const to = Temporal.PlainDateTime.from(req.query.to as string);

  const recordCount: number = await getRentalCount(knex('rental')
    .whereBetween('rentalDate', [from, to]));
  return res.json({ recordCount });
});

app.listen(3000, () => {
  console.log('Application listening at port 3000');
});