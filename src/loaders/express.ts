import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { AppError, BadRequest, HTTPNotFound } from '@utils/appError';
import database from '@loaders/database';
import router from '@api/index';
import dotenv from 'dotenv';
import path from 'path';
import { whiteList } from '@configs/whitelist.config';
import { ENVIRONMENT, ROUTES } from '@interfaces/index';

dotenv.config();

export default ({ app }: { app: Application }) => {
  app.use(ROUTES.rootPath, express.static(path.join(__dirname, ROUTES.public)));

  app.get(ROUTES.rootPath, (req, res) => {
    res.status(200).send('Nutech Test 2023');
  });
  app.enable('trust proxy');
  /**
   * Cors
   */
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (whiteList.indexOf(origin) === -1 && whiteList.indexOf('*') === -1) {
          const msg = `The CORS policy for this site does not allow access from this ${origin} specified origin`;
          return callback(new BadRequest(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );
  /**
   * Body Parser
   */
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  /**
   * Check Status
   */
  app.get(ROUTES.status, (req, res) => {
    res.status(200).send({ message: 'OK' });
  });
  /**
   * Reset Database
   */

  if (process.env.ENVIRONMENT === ENVIRONMENT.development)
    app.get(ROUTES.clearDB, async (req, res) => {
      await database.clearDatabase();
      res.status(200).send({ message: 'Database reset.' });
    });

  /**
   * Load Route
   */
  app.use(ROUTES.apiPrefix, router());

  /**
   * HTTP NOT Found Handler
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    throw new HTTPNotFound(`Page you are looking ${req.originalUrl} not found`);
  });

  /**
   * Global Error Catcher
   */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'Error',
        statusCode: err.statusCode,
        message: err.message,
        errors: err.error,
      });
    }

    let statusCode: number | undefined;

    if (err.message === 'JWT expired.') {
      statusCode = 401;
    }

    return res.status(statusCode || 500).json({
      status: 'Error',
      statusCode,
      message: err.message,
      errors: err,
    });
  });
};
