import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carsOps";
import { createSelector } from "@reduxjs/toolkit";
const initialState = {
  data: {
    items: [],
    total: 0,
  },
  loading: false,
  error: null,
};
const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
const selecrCarsData = (state) => state.cars.data;
export const selectItemsArray = createSelector(
  [selecrCarsData],
  (data) => data?.items?.items ?? [],
);

export const carsReducer = carsSlice.reducer;
