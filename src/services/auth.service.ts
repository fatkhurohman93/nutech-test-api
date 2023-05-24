import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import { base64ToImage, catchError, generateString } from '@utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../configs/secret.config';
import {
  Users,
  USERNAME,
  USER_ATTRIBUTES,
  MODEL_NAME,
  FOLDER_NAME,
} from '@interfaces/index';
import { checkPassword } from './user.service';
import { dateLocal } from '@utils/index';

const { users } = models;

export const signUp = async (params: Users, userName?: USERNAME) => {
  try {
    if (!params.userName || !params.password || !params.email) {
      throw new BadRequest('Wrong parameter!');
    }
    const dateParameter = dateLocal();

    const createdBy = userName || USER_ATTRIBUTES.anonymous;

    const image = params.image
      ? base64ToImage(
          params.image,
          params.imageName || generateString(8),
          FOLDER_NAME.USER
        )
      : '';

    params.password = bcrypt.hashSync(params.password, 8);

    logger.info(`Creating ${MODEL_NAME.user}...`);

    const result = await users.create({
      ...params,
      image,
      createdBy,
      archived: false,
      ...dateParameter,
    });

    logger.info(
      `${MODEL_NAME.user} with id: ${params.userName} has been created successfuly.`
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const signIn = async (params: Users) => {
  try {
    if (!params.userName || !params.password) {
      throw new BadRequest('username or password cannot be empty!');
    }

    logger.info(`Login Username: ${params.userName}...`);

    const { userName, email, name, flagRoles, passwordIsValid } =
      await checkPassword(params.password, params.userName);

    const token = jwt.sign(
      {
        userName,
        email,
        name,
      },
      secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    if (!passwordIsValid) {
      throw new BadRequest('Wrong password!');
    }

    logger.info(`Username: ${userName} login successfully.`);

    return {
      flagRoles,
      name,
      token,
    };
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
