import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Temporal } from '@js-temporal/polyfill';
import cors from 'cors';

import knex from './knex';
import { query } from 'express-validator';
import getRentalCount from './query/getRentalCount';
import handlerWrapper from './middleware/handlerWrapper';

const app = express();
app.use(express.json());
dotenv.config();

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log('origin ' + origin);
    if (whitelist.indexOf(origin) !== -1) {
      console.log('its inside whitelist');
      callback(null, true);
    } else {
      console.log('origin ' + origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get(
  '/requestCount',
  handlerWrapper(
    async (req: Request, res: Response, _next) => {
      const from = Temporal.PlainDateTime.from(req.query.from as string);
      const to = Temporal.PlainDateTime.from(req.query.to as string);

      if (Temporal.PlainDateTime.compare(from, to) >= 0) {
        return res.status(400).json({ error: 'query date range is invalid' });
      }
      const recordCount: number = await getRentalCount(knex('rental')
        .whereBetween('rentalDate', [from, to]));
      return res.json({ recordCount });
    },
    [
      query('from', 'parameter from must be in date format').isDate(
        {
          format: 'YYYY-MM-DD',
          delimiters: ['-'],
        },
      ),
      query('to', 'parameter to must be in date format').isDate(
        {
          format: 'YYYY-MM-DD',
          delimiters: ['-'],
        },
      ),
    ],
  ),
);

app.listen(3000, () => {
  console.log('Application listening at port 3000');
});