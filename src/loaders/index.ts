import express from 'express';
import expressLoader from './express';
import database from './database';
import logger from './logger';

export default async (app: express.Application) => {
  // Create SQLite3 Connection
  // await database.getConnection();

  expressLoader({ app });
  logger.info('Nutech Test 2023');
};
