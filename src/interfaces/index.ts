export * from './users.interface';
export * from './products.interface';
export * from './config';
export * from './routes';
export * from './modelName.interface';
export * from './common.interface';

export interface IData {
  count: number;
  rows: object[];
}

export interface OrderParams {
  orderOption: string;
  orderType: string;
}

export interface FindAllParams {
  name: string;
  size: number;
  page: number;
  archived?: boolean;
  orderParams?: OrderParams;
}

export enum SortingOption {
  name = 'name',
  userName = 'userName',
}

export enum SortingType {
  ASC = 'asc',
  DESC = 'desc',
}

export type OrderBy = [string, string];

export type ID = string | number;

export enum FOLDER_NAME {
  USER = 'user',
  PRODUCT = 'product',
}
