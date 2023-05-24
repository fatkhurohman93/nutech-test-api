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
  generateString,
} from '@utils/index';
import {
  Products,
  FindAllParams,
  USERNAME,
  ID,
  USER_ATTRIBUTES,
  MODEL_NAME,
  ARCHIVING_STATUS,
  OrderBy,
  FOLDER_NAME,
} from '@interfaces/index';
import { sequelize } from '@models/index';

const { and } = sequelize;
const { products } = models;

export const create = async (data: Products, whoIsAccess: USERNAME) => {
  try {
    if (!data.name) throw new BadRequest('Wrong parameter!');

    logger.info(`Creating ${MODEL_NAME.product}...`);

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || generateString(8),
          FOLDER_NAME.PRODUCT
        )
      : '';

    const dateParameter = dateLocal();
    const createdBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const result = await products.create({
      ...data,
      ...dateParameter,
      image,
      createdBy,
      archived: false,
    });

    logger.info(
      `${MODEL_NAME.product} with id: ${
        result.toJSON().id
      } has been created successfuly.`
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived, orderParams } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(`Fetching ${MODEL_NAME.product}...`);

    const orderBy: OrderBy = sortingData(orderParams);

    const result = await products.findAndCountAll({
      where: and(filterByName(name), filterAny({ archived })),
      order: [orderBy],
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(`${finalResult.totalItems} ${MODEL_NAME.product}(s) fetched.`);

    return { items: finalResult.items };
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findOne = async (id: ID) => {
  try {
    if (!id) {
      throw new BadRequest('Wrong id!');
    }

    logger.info(`Fetching ${MODEL_NAME.product} data by id: ${id}...`);

    const result = await products.findOne({
      where: { id },
    });

    if (!result) {
      throw new BadRequest(`${MODEL_NAME.product} not found!`);
    }

    logger.info(
      `${MODEL_NAME.product} id: ${id} has been fetched successfully.`
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (data: Products, whoIsAccess: USERNAME, id: ID) => {
  try {
    if (!id) {
      throw new BadRequest('Wrong id!');
    }

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(`Updating ${MODEL_NAME.product} data by id: ${id}...`);

    const { name, sellPrice, buyPrice, quantity } = data;

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || generateString(8),
          FOLDER_NAME.PRODUCT
        )
      : '';

    const result = await products.update(
      {
        name,
        sellPrice,
        buyPrice,
        quantity,
        image: image ? image : undefined,
        lastUpdatedBy,
        lastUpdatedTime,
      },
      { where: { id } }
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

export const archivedAndUnarchived = async (
  whoIsAccess: USERNAME,
  id: ID,
  status: ARCHIVING_STATUS
) => {
  try {
    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(
      ARCHIVING_STATUS.archived
        ? `Archiving ${MODEL_NAME.product}. id: ${id}`
        : `Unarchiving ${MODEL_NAME.product}. id: ${id}`
    );

    const result = await products.update(
      {
        archived: status === ARCHIVING_STATUS.archived,
        lastUpdatedTime,
        lastUpdatedBy,
      },
      { where: { id } }
    );

    if (!result[0]) {
      if (status === ARCHIVING_STATUS.archived)
        throw new BadRequest('Failed to archived!');
      throw new BadRequest('Failed to unarchived!');
    }

    const ARCHIVED_SUCCESS = `${MODEL_NAME.product} with id: ${id} has been archived successfully`;
    const UNARCHIVED_SUCCESS = `${MODEL_NAME.product} with id: ${id} has been unarchived successfully`;

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

export const destroy = async (id: ID) => {
  try {
    if (!id) throw new BadRequest('Wrong id!');

    logger.info(`Deleting ${MODEL_NAME.product} by id: ${id}...`);

    const result = await products.destroy({ where: { id } });

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
