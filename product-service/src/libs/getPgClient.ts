import { Pool } from 'pg';

import { dbOptions } from '../db/dbOptions';

let pool;

export const getPgClient = async () => {
  if (!pool) {
    pool = new Pool(dbOptions);
  }

  return pool.connect();
};
