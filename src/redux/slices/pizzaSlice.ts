import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem } from './cartSlice';

type FetchPizzasArgs = {
  currentPage: string;
  order: string;
  sortBy: string;
  search: string;
  categoryId: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizassStatus',
  async (params: FetchPizzasArgs) => {
    const { currentPage, order, sortBy, search, categoryId } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://634548cb39ca915a69fa9fb0.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}&search=${search}`,
    );

    return data as Pizza[];
  },
);

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  REJECTED = 'rejected',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.REJECTED;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
  },

  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //     console.log('Pending request');
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //     console.log(state, 'All Ok');
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'rejected';
  //     state.items = [];
  //     console.log('Error: ' + state);
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
