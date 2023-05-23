import { Common } from './common.interface';

export interface Products extends Common {
  [PRODUCT_ATTRIBUTES.id]?: number | string;
  [PRODUCT_ATTRIBUTES.name]: string;
  [PRODUCT_ATTRIBUTES.image]?: string;
  [PRODUCT_ATTRIBUTES.imageName]?: string;
  [PRODUCT_ATTRIBUTES.buyPrice]: number;
  [PRODUCT_ATTRIBUTES.sellPrice]: number;
  [PRODUCT_ATTRIBUTES.quantity]: number;
}

export enum PRODUCT_ATTRIBUTES {
  id = 'id',
  name = 'name',
  image = 'image',
  imageName = 'imageName',
  buyPrice = 'buyPrice',
  sellPrice = 'sellPrice',
  quantity = 'quantity',
}
