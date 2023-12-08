import { createSlice } from '@reduxjs/toolkit';

export const CarouselSelectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addItem } = CarouselSelectedItemSlice.actions;

export default CarouselSelectedItemSlice.reducer;
