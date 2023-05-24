import {
  SortingOption,
  SortingType,
  OrderBy,
  OrderParams,
} from '@interfaces/index';

export const sortingData = (orderParams: OrderParams | undefined) => {
  const orderBy = [];

  switch (orderParams?.orderOption) {
    case SortingOption.name:
      orderBy.push(SortingOption.name);
      break;
    case SortingOption.userName:
      orderBy.push(SortingOption.userName);
      break;
    default:
      orderBy.push(SortingOption.createdTime);
  }

  switch (orderParams?.orderType) {
    case SortingType.ASC:
      orderBy.push(SortingType.ASC);
      break;
    default:
      orderBy.push(SortingType.DESC);
  }

  return orderBy as OrderBy;
};
