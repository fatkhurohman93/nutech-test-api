import { Sequelize } from 'sequelize';
import UsersModel from './users.model';
import ProductsModel from './products.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  logging: false,
  dialectOptions: { decimalNumbers: true },
});

const models = {
  users: UsersModel(sequelize),
  products: ProductsModel(sequelize),
};

export { sequelize, models };
