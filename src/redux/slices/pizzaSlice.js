import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizassStatus', async (params, thunkAPI) => {
  const { currentPage, order, sortBy, search, categoryId } = params;
  const { data } = await axios.get(
    `https://634548cb39ca915a69fa9fb0.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortBy}&order=${order}&search=${search}`,
  );

  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
      console.log('Pending request');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      console.log(state, 'All Ok');
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'rejected';
      state.items = [];
      console.log('Error: ' + state);
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
