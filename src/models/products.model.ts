import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const ProductsModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Products>> => {
  return sequelize.define(
    TABLE_NAME.product,
    {
      name: {
        type: DataTypes.STRING('30'),
      },
      image: {
        type: DataTypes.STRING,
      },
      buyPrice: {
        type: DataTypes.FLOAT,
      },
      sellPrice: {
        type: DataTypes.FLOAT,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default ProductsModel;
