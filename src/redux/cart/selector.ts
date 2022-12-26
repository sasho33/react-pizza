import { RootState } from '../store';
export const selectCart = (state: RootState) => state.cart; // selector for cart to DRY 2 string in Cart and Header

export const selectcartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
