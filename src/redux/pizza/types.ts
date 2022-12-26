export type FetchPizzasArgs = {
  currentPage: string;
  order: string;
  sortBy: string;
  search: string;
  categoryId: number;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};
