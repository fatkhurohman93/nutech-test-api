import express from 'express';
import logger from '@loaders/logger';
import loaders from '@loaders/index';
import { getLocalIP as localIP } from '@utils/index';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;
  const environment = process.env.ENVIRONMENT || 'PROD';
  await loaders(app);

  app.listen({ port }, () => {
    if (environment === 'DEV')
      logger.info(
        `🚀 Server listening at http://${localIP() || 'localhost'}:${port}`
      );
    else
      console.log(
        `🚀 Server listening at http://${localIP() || 'localhost'}:${port}`
      );
  });
};

startServer();
