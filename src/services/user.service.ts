import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import {
  getPagination,
  getPagingData,
  filterByName,
  filterAny,
  base64ToImage,
  catchError,
  dateLocal,
  sortingData,
} from '@utils/index';
import {
  Users,
  FindAllParams,
  USERNAME,
  ID,
  PASSWORD,
  USER_ATTRIBUTES,
  MODEL_NAME,
  ARCHIVING_STATUS,
  OrderBy,
  FOLDER_NAME,
} from '@interfaces/index';
import bcrypt from 'bcrypt';
import { sequelize } from '@models/index';

const { and } = sequelize;
const { users } = models;

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived, orderParams } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(`Fetching ${MODEL_NAME.user}...`);

    const orderBy: OrderBy = sortingData(orderParams);

    const result = await users.findAndCountAll({
      where: and(filterByName(name), filterAny({ archived })),
      attributes: { exclude: [USER_ATTRIBUTES.password] },
      limit,
      offset,
      order: [orderBy],
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(`${finalResult.totalItems} ${MODEL_NAME.user}(s) fetched.`);

    return finalResult;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findOne = async (userName: USERNAME) => {
  try {
    if (!userName) {
      throw new BadRequest('Wrong userName!');
    }

    logger.info(`Fetching ${MODEL_NAME.user} data by id: ${userName}...`);

    const result = await users.findOne({
      where: { userName },
      attributes: { exclude: [USER_ATTRIBUTES.password] },
    });

    if (!result) {
      throw new BadRequest(`${MODEL_NAME.user} not found!`);
    }

    logger.info(
      `${MODEL_NAME.user} id: ${userName} has been fetched successfully.`
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (
  data: Users,
  whoIsAccess: USERNAME,
  userName: USERNAME
) => {
  try {
    if (!userName) {
      throw new BadRequest('Wrong userName!');
    }

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(`Updating ${MODEL_NAME.user} data by id: ${userName}...`);

    const { name, email, flagRoles } = data;

    const image = data.image
      ? base64ToImage(data.image, data.imageName || 'no-name', FOLDER_NAME.USER)
      : '';

    const result = await users.update(
      { name, email, image, flagRoles, lastUpdatedBy, lastUpdatedTime },
      { where: { userName } }
    );

    if (!result[0]) {
      throw new BadRequest('No data has been updated!');
    }

    logger.info(
      `${result[0]} data ${
        result[0] > 1 ? 'has' : 'have'
      } been updated successfully.`
    );

    return `${result[0]} data ${
      result[0] > 1 ? 'has' : 'have'
    } been updated successfully.`;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const checkPassword = async (password: PASSWORD, userName: USERNAME) => {
  try {
    logger.info(`Checking password for ${userName}...`);

    if (!userName || !password) {
      throw new BadRequest('Wrong parameter!');
    }

    const userResult = await users.findOne({
      where: { userName },
    });

    if (!userResult) {
      throw new BadRequest(`${MODEL_NAME.user} not found!`);
    }

    const userResultToJSON = userResult.toJSON();

    const passwordIsValid = bcrypt.compareSync(
      password,
      userResultToJSON.password
    );

    return {
      passwordIsValid,
      userName: userResultToJSON.userName,
      name: userResultToJSON.name,
      email: userResultToJSON.email,
      flagRoles: userResultToJSON.flagRoles,
    };
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (
  oldPassword?: PASSWORD,
  newPassword?: PASSWORD,
  userName?: USERNAME
) => {
  try {
    if (!oldPassword || !newPassword || !userName) {
      throw new BadRequest('Wrong parameter!');
    }

    const { passwordIsValid } = await checkPassword(oldPassword, userName);

    if (!passwordIsValid) {
      throw new BadRequest('Wrong password!');
    }
    const password = bcrypt.hashSync(newPassword, 8);

    const updatePasswordResult = await users.update(
      { password },
      { where: { userName } }
    );

    if (!updatePasswordResult[0]) {
      throw new BadRequest('Password failed to update!');
    }

    return 'Password has been updated successfully.';
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const archivedAndUnarchived = async (
  whoIsAccess: USERNAME,
  userName: ID,
  status: ARCHIVING_STATUS
) => {
  try {
    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(
      ARCHIVING_STATUS.archived
        ? `Archiving ${MODEL_NAME.user}. id: ${userName}`
        : `Unarchiving ${MODEL_NAME.user}. id: ${userName}`
    );

    const result = await users.update(
      {
        archived: status === ARCHIVING_STATUS.archived,
        lastUpdatedTime,
        lastUpdatedBy,
      },
      { where: { userName } }
    );

    if (!result[0]) {
      if (status === ARCHIVING_STATUS.archived)
        throw new BadRequest('Failed to archived!');
      throw new BadRequest('Failed to unarchived!');
    }

    const ARCHIVED_SUCCESS = `${MODEL_NAME.user} with id: ${userName} has been archived successfully`;
    const UNARCHIVED_SUCCESS = `${MODEL_NAME.user} with id: ${userName} has been unarchived successfully`;

    if (status === ARCHIVING_STATUS.archived) {
      logger.info(ARCHIVED_SUCCESS);

      return ARCHIVED_SUCCESS;
    } else {
      logger.info(UNARCHIVED_SUCCESS);

      return UNARCHIVED_SUCCESS;
    }
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const destroy = async (userName: USERNAME) => {
  try {
    if (!userName) throw new BadRequest('Wrong userName!');

    logger.info(`Deleting ${MODEL_NAME.user} by id: ${userName}...`);

    const result = await users.destroy({ where: { userName } });

    if (!result) {
      throw new BadRequest('No data has been deleted!');
    }

    logger.info(
      `${result} data ${result > 1 ? 'has' : 'have'} been deleted successfully.`
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
