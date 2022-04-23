import { Knex } from 'knex';

const getRentalCount = async (q: Knex.QueryBuilder) => {
  const result = await q.count('rentalId').first();
  return parseInt(result.count as string, 10);
};

export default getRentalCount;