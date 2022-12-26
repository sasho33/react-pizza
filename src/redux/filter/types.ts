export enum SortPropertyEnum {
  RATING_ASK = 'rating',
  RATING_DESC = '-rating',
  TITLE_ASK = 'title',
  TITLE_DESC = '-title',
  PRICE_ASK = 'price',
  PRICE_DESC = '-price',
}

export type Sort = {
  name: string;
  // sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: any;
}
