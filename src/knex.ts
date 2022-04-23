import knex from 'knex';
import knexStringcase from 'knex-stringcase';
import knexfile from './knexfile';

export default knex(knexStringcase(knexfile.development));