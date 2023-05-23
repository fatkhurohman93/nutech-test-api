import logger from '@loaders/logger';
import { sequelize as db } from '@models/index';

const getConnection = async () => {
  try {
    logger.info('Begin database connection...');
    await db.sync();
    await db.authenticate();
    logger.info('Connect to database successfully');
  } catch (error) {
    logger.error(`🔥 failed connect to database, message: ${error.message}`);
  }
};

const clearDatabase = async () => {
  try {
    await db.sync({ force: true });
    logger.info('Database reset.');
  } catch (error) {
    logger.error('Unable to clear the database.');
  }
};

const connectionManager = {
  getConnection,
  clearDatabase,
};

export default connectionManager;
